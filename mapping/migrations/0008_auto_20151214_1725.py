# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 22:25
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0007_worksheet_unlocked_by'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='worksheet',
            options={'permissions': (('unlock_worksheet', 'Can update worksheets'),)},
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='unlocked_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locked_worksheets', to=settings.AUTH_USER_MODEL, verbose_name='Being edited by'),
        ),
    ]
