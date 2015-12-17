# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-16 18:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0014_auto_20151216_1357'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worksheet',
            name='number_injuries_source',
            field=models.CharField(blank=True, help_text='Copy the link for the source of the number of injuries here.\t', max_length=1000, null=True, verbose_name='Source'),
        ),
    ]