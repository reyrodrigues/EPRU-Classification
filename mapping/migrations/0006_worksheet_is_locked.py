# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 21:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0005_auto_20151214_1611'),
    ]

    operations = [
        migrations.AddField(
            model_name='worksheet',
            name='is_locked',
            field=models.BooleanField(default=True),
        ),
    ]