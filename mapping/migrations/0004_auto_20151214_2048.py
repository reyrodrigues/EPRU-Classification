# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 20:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0003_auto_20151214_2043'),
    ]

    operations = [
        migrations.AddField(
            model_name='worksheet',
            name='number_affected_source',
            field=models.URLField(blank=True, null=True, verbose_name='Source'),
        ),
        migrations.AddField(
            model_name='worksheet',
            name='number_deaths_source',
            field=models.URLField(blank=True, null=True, verbose_name='Source'),
        ),
        migrations.AddField(
            model_name='worksheet',
            name='number_displaced_source',
            field=models.URLField(blank=True, null=True, verbose_name='Source'),
        ),
        migrations.AddField(
            model_name='worksheet',
            name='number_injuries_source',
            field=models.URLField(blank=True, null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='start',
            field=models.DateField(null=True, verbose_name='Start date of crisis'),
        ),
    ]
