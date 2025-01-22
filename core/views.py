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
    recent_leads = Lead.objects.select_related('customer', 'profile', 'order').order_by('-created_at')[:4]
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
    query = request.GET.get('query', '').strip()
    leads = []

    # Check if query is string or number
    if query.isalpha() or (len(query) > 0 and not query.isnumeric()):
        if query.upper().startswith('L'):
            # Search in Lead IDs
            leads = Lead.objects.filter(lead_id__icontains=query)
        else:
            # Search in Customer names
            leads = Lead.objects.filter(customer__customer_name__icontains=query)
    else:
        # Search in Order IDs first
        leads = Lead.objects.filter(order__order_id__icontains=query)
        
        # If no results found, search in customer mobile numbers
        if not leads.exists():
            leads = Lead.objects.filter(customer__mobile_number__icontains=query)

    leads_data = lead_format(leads)
    return Response({
        "message": "Search Results",
        "leads": leads_data
    })



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_form_submit(request):
    with transaction.atomic():
        try:
            # Get current user's profile
            print("Heres the edit page data",request.data)
            user_profile = Profile.objects.get(user=request.user)
            
            # Extract data
            customer_data = request.data.get('customerInfo')
            location_data = request.data.get('location')
            workshop_data = request.data.get('workshop')
            arrival_data = request.data.get('arrivalStatus')
            basic_data = request.data.get('basicInfo')

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
                source=customer_data['source'],
                lead_type=basic_data['carType'],
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


# @api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def filter_leads(request):
#     filter_data = request.data
#     print('This is the filter data', filter_data)
#     query = Lead.objects.all()
    
#     if filter_data.get('user'):
#         query = query.filter(profile__user__username=filter_data['user'])
#     if filter_data.get('source'):
#         query = query.filter(source=filter_data['source'])
#     if filter_data.get('status'):
#         query = query.filter(lead_status=filter_data['status'])
#     if filter_data.get('location'):
#         query = query.filter(city=filter_data['location'])
#     if filter_data.get('language_barrier'):
#         query = query.filter(customer__language_barrier=True)
#     # ... add other filters
    
#     leads = query.order_by('-created_at')
#     leads_data = lead_format(leads)
#     print(leads_data,'this is the leads data for', filter_data['user'])
    
#     return Response({'leads': leads_data})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def filter_leads(request):
    filter_data = request.data
    query = Lead.objects.all()
    
    # User filter
    if filter_data.get('user'):
        query = query.filter(profile__user__username=filter_data['user'])
    
    # Basic filters
    if filter_data.get('source'):
        query = query.filter(source=filter_data['source'])
    if filter_data.get('status'):
        query = query.filter(lead_status=filter_data['status'])
    if filter_data.get('location'):
        query = query.filter(city=filter_data['location'])
    if filter_data.get('language_barrier'):
        query = query.filter(customer__language_barrier=True)
    if filter_data.get('arrivalMode'):
        query = query.filter(arrival_mode=filter_data['arrivalMode'])
        
    # Car type filter (luxury/normal)
    if filter_data.get('luxuryNormal'):
        query = query.filter(lead_type=filter_data['luxuryNormal'])
    
    # Date range filter
    # if filter_data.get('dateRange'):
    #     if filter_data['dateRange'].get('startDate'):
    #         query = query.filter(created_at__gte=filter_data['dateRange']['startDate'])
    #     if filter_data['dateRange'].get('endDate'):
    #         query = query.filter(created_at__lte=filter_data['dateRange']['endDate'])
            
    # Specific date filter
    if filter_data.get('dateCreated'):
        query = query.filter(created_at__date=filter_data['dateCreated'])
    
    # Order by latest first
    leads = query.order_by('-created_at')
    leads_data = lead_format(leads)
    
    return Response({'leads': leads_data})


def lead_format(leads):
    leads_data = [{
        'id': lead.lead_id or 'NA',
        'type': lead.lead_type or 'NA',
        'location': lead.city or 'NA',
        'name': lead.customer.customer_name if lead.customer else 'NA',
        'vehicle': 'NA',
        'number': lead.customer.mobile_number if lead.customer else 'NA',
        'source': lead.source or 'NA',
        'orderId': lead.order.order_id if lead.order else 'NA',
        'regNumber': 'NA',
        'status': lead.lead_status or 'NA',
        'cce': lead.profile.user.username if (lead.profile and lead.profile.user) else 'NA',
        'ca': lead.ca_name or 'NA',
        'arrivalDate': lead.arrival_time.strftime("%b %d,%Y,%H:%M") if lead.arrival_time else 'NA',
        'createdAt': lead.created_at.strftime("%b %d,%Y,%H:%M") if lead.created_at else 'NA',
        'modifiedAt': lead.updated_at.strftime("%b %d,%Y,%H:%M") if lead.updated_at else 'NA'
    } for lead in leads]
    return leads_data

