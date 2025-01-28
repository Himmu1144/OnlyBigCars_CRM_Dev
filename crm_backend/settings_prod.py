from .settings import *

# Security settings for production
DEBUG = False

# We'll use environment variables for sensitive data
import os

# Database configuration for Cloud SQL
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
    "https://your-app.web.app",
    "https://your-app.firebaseapp.com"
]

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Additional security settings
SECURE_SSL_REDIRECT = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True