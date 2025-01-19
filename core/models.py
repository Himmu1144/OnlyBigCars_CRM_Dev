from django.db import models

# No need to define Token model as it's provided by DRF
# For reference, this is what DRF's Token model looks like internally:
"""
from django.conf import settings
from django.db import models

class Token(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='auth_token',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
"""

# class Lead(models.Model):
#     # Customer Information
#     customer_name = models.CharField(max_length=255)
#     mobile_number = models.CharField(max_length=20)
#     whatsapp_number = models.CharField(max_length=20, blank=True)
#     customer_email = models.EmailField(blank=True)
    
#     # Location Information
#     address = models.TextField()
#     city = models.CharField(max_length=100)
#     state = models.CharField(max_length=100)
#     building_name = models.CharField(max_length=255, blank=True)
#     flat_number = models.CharField(max_length=50, blank=True)
#     landmark = models.CharField(max_length=255, blank=True)

#     # Car Details
#     vehicle_type = models.CharField(max_length=50)  # Luxury/Normal
#     car_model = models.CharField(max_length=255)
#     registration_number = models.CharField(max_length=50)

#     # Service Details
#     selected_services = models.JSONField(default=list)
#     ca_comments = models.TextField(blank=True)
    
#     # Workshop Details
#     workshop_name = models.CharField(max_length=255)
#     ca_assigned = models.CharField(max_length=255)
#     cce_assigned = models.CharField(max_length=255)
    
#     # Status and Timestamps
#     lead_status = models.CharField(max_length=50)
#     arrival_mode = models.CharField(max_length=50)
#     arrival_date = models.DateTimeField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     modified_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.customer_name} - {self.car_model}"

# Add your custom models here if needed
