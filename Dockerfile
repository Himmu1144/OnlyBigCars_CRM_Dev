FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1
ENV PORT 8080
ENV HOST 0.0.0.0

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-server-dev-all \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install gunicorn
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create necessary directories
RUN mkdir -p /app/staticfiles /app/static

# Copy application code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Create superuser script
RUN echo 'import os; \
    import django; \
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "crm_backend.settings"); \
    django.setup(); \
    from django.contrib.auth import get_user_model; \
    User = get_user_model(); \
    if not User.objects.filter(username="admin").exists(): \
        User.objects.create_superuser("admin", "admin@example.com", "your_password")' > create_superuser.py

# Expose the port
EXPOSE $PORT

# Create startup script
RUN echo '#!/bin/bash\n\
python create_superuser.py\n\
gunicorn --bind $HOST:$PORT --workers 3 --threads 8 --timeout 0 crm_backend.wsgi:application' > start.sh && \
    chmod +x start.sh

# Set the entrypoint
ENTRYPOINT ["./start.sh"]