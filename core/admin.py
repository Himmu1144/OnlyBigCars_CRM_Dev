from django.contrib import admin
from .models import Profile, Customer, Order, Lead

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'status']
    search_fields = ['user__username', 'status']
    list_filter = ['status']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'mobile_number', 'created_at']
    search_fields = ['customer_name', 'mobile_number', 'customer_email']
    list_filter = ['created_at', 'language_barrier']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'customer', 'profile', 'created_at']
    search_fields = ['order_id', 'customer__customer_name']
    list_filter = ['created_at']
    filter_horizontal = ['leads']

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['lead_id', 'customer', 'profile', 'order', 'lead_status', 'created_at']
    search_fields = ['lead_id', 'customer__customer_name', 'city']
    list_filter = ['lead_status', 'lead_type', 'city', 'created_at']
    fieldsets = (
        ('Relationships', {
            'fields': ('customer', 'profile', 'order')
        }),
        ('Basic Info', {
            'fields': ('lead_id', 'source', 'service_type', 'lead_type', 'estimated_price')
        }),
        ('Location', {
            'fields': ('address', 'city', 'state', 'building', 'landmark', 'flat_number')
        }),
        ('Status', {
            'fields': ('lead_status', 'arrival_mode', 'disposition', 'arrival_time')
        }),
        ('Workshop', {
            'fields': ('workshop_details', 'ca_name', 'cce_comments')
        })
    )
    readonly_fields = ('lead_id',)  # Make lead_id read-only in admin
