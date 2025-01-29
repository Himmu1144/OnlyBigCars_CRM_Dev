from .settings import *

# Security settings for production
DEBUG = os.getenv('DEBUG', 'False') == 'True'

# We'll use environment variables for sensitive data
import os

# Database configuration for Cloud SQL
ALLOWED_HOSTS = ['*']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('onlybigcars-crm'),
        'USER': os.getenv('user1'),
        'PASSWORD': os.getenv('@obcdbpass'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': '5432',
    }
}

# CORS settings for Firebase
CORS_ALLOWED_ORIGINS = [
    # Add your Firebase URLs here - both the .web.app and .firebaseapp.com versions
    "https://ivory-enigma-449205-u0.web.app",
    "https://ivory-enigma-449205-u0.firebaseapp.com",
    "https://onlybigcars-crm-dev1-605837710812.asia-south2.run.app"
]

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Add CORS_ALLOWED_METHODS
CORS_ALLOWED_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
]

# Additional security settings
SECURE_SSL_REDIRECT = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Add CSRF settings
CSRF_TRUSTED_ORIGINS = [
    "https://ivory-enigma-449205-u0.web.app",
    "https://ivory-enigma-449205-u0.firebaseapp.com",
    "https://onlybigcars-crm-dev1-605837710812.asia-south2.run.app"
]