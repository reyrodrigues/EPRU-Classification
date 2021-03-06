# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 22:15
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mapping', '0006_worksheet_is_locked'),
    ]

    operations = [
        migrations.AddField(
            model_name='worksheet',
            name='unlocked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locked_worksheets', to=settings.AUTH_USER_MODEL),
        ),
    ]
