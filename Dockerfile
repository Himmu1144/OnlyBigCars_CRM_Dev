FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1
# Add this line to set a default port
ENV PORT 8080

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-server-dev-all \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/staticfiles /app/static

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

# Modified CMD line to explicitly use 0.0.0.0
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 3 --threads 8 crm_backend.wsgi:application
