from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('api/edit-form-submit/', views.edit_form_submit, name='edit_form_submit'),
    path('api/leads/search/', views.search_leads, name='search_leads'),
    path('api/leads/filter/', views.filter_leads, name='filter_leads')  # Add this line
]