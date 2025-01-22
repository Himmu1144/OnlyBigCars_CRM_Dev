from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework import status

from django.db import transaction
from .models import Customer, Lead, Profile, Order


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def home_view(request):
    # Get 3 most recent leads
    recent_leads = Lead.objects.select_related('customer', 'profile', 'order').order_by('-created_at')[:3]
    leads_data = lead_format(recent_leads)

    # Get all users
    users = User.objects.all().values('id', 'username')
    users_data = list(users)

    return Response({
        "message": "Recent Leads",
        "leads": leads_data,
        "users": users_data
    })



@api_view(['GET'])
def search_leads(request):
    mobile_number = request.GET.get('mobile')
    # Search leads by customer's mobile number
    leads = Lead.objects.filter(customer__mobile_number__icontains=mobile_number)
    # Return same format as home_view for consistency
    leads_data = lead_format(leads)

    return Response({
        "message": "Recent Leads",
        "leads": leads_data
    })



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_form_submit(request):
    with transaction.atomic():
        try:
            # Get current user's profile
            user_profile = Profile.objects.get(user=request.user)
            
            # Extract data
            customer_data = request.data.get('customerInfo')
            location_data = request.data.get('location')
            workshop_data = request.data.get('workshop')
            arrival_data = request.data.get('arrivalStatus')

            # Create or get customer
            customer, created = Customer.objects.get_or_create(
                mobile_number=customer_data['mobileNumber'],
                defaults={
                    'customer_name': customer_data['customerName'],
                    'whatsapp_number': customer_data['whatsappNumber'],
                    'customer_email': customer_data['customerEmail'],
                    'language_barrier': customer_data['languageBarrier']
                }
            )

            # Create lead with user's profile
            lead = Lead.objects.create(
                profile=user_profile,  # Add the user's profile
                customer=customer,
                # Location info
                address=location_data['address'],
                city=location_data['city'],
                state=location_data['state'],
                building=location_data['buildingName'],
                flat_number=location_data['flatNumber'],
                landmark=location_data['landmark'],
                # Status info
                lead_status=arrival_data['leadStatus'],
                arrival_mode=arrival_data['arrivalMode'],
                disposition=arrival_data['disposition'],
                arrival_time=arrival_data['dateTime'] if arrival_data['dateTime'] else None,
                # Workshop info
                workshop_details=workshop_data,
                ca_name=workshop_data['ca'],
                # Store other data
                products=request.data.get('overview', {}).get('tableData', [])
            )

            return Response({
                "message": "Data saved successfully",
                "customer_id": customer.id,
                "lead_id": lead.id
            }, status=status.HTTP_201_CREATED)

        except Profile.DoesNotExist:
            return Response({
                "message": "User profile not found"
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "message": f"Error saving data: {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# def edit_form_submit(request):
#     try:
#         # Print received data for now
#         print("Received form data:", request.data)
#         return Response({
#             "message": "Form data received successfully",
#             "data": request.data
#         }, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({
#             "message": str(e)
#         }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def filter_leads(request):
    filter_data = request.data
    query = Lead.objects.all()
    
    if filter_data.get('user'):
        query = query.filter(profile__user__username=filter_data['user'])
    if filter_data.get('source'):
        query = query.filter(source=filter_data['source'])
    if filter_data.get('status'):
        query = query.filter(lead_status=filter_data['status'])
    if filter_data.get('location'):
        query = query.filter(city=filter_data['location'])
    if filter_data.get('language_barrier'):
        query = query.filter(customer__language_barrier=True)
    # ... add other filters
    
    leads = query.order_by('-created_at')
    leads_data = lead_format(leads)
    print(leads_data,'this is the leads data for', filter_data['user'])
    
    return Response({'leads': leads_data})


def lead_format(leads):
    leads_data = [{
    'id': lead.lead_id,
    'type': lead.lead_type or 'General',
    'location': lead.city,
    'name': lead.customer.customer_name,
    'vehicle': 'NA',  # You might want to add this to your model
    'number': lead.customer.mobile_number,
    'source': lead.source,
    'orderId': lead.order.order_id if lead.order else 'NA',
    'regNumber': 'NA',  # You might want to add this to your model
    'status': lead.lead_status,
    'cce': f"CCE: {lead.profile.user.username if lead.profile else 'NA'}",
    'ca': f"CA: {lead.ca_name or 'NA'}",
    'recallDate': lead.created_at.strftime("%b %d,%Y,%I:%M %p"),
    'arrivalDate': lead.arrival_time.strftime("%b %d,%Y,%I:%M %p") if lead.arrival_time else 'NA',
    'createdAt': lead.created_at.strftime("%b %d,%Y,%I:%M %p"),
    'modifiedAt': lead.updated_at.strftime("%b %d,%Y,%I:%M %p")
} for lead in leads]
     
    return leads_data

