# Generated by Django 5.0.1 on 2025-01-20 09:27

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='lead_id',
            field=models.CharField(default=core.models.Lead.generate_lead_id, editable=False, max_length=100, unique=True),
        ),
    ]
