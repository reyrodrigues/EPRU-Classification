# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 20:29
from __future__ import unicode_literals

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Worksheet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emergency_country', django_countries.fields.CountryField(max_length=2, verbose_name='Emergency country')),
                ('origin_country', django_countries.fields.CountryField(blank=True, max_length=2, null=True, verbose_name='Country of origin (if different)')),
                ('start_date', models.DateField(auto_now_add=True, null=True, verbose_name='Start date of crisis')),
                ('natural_disaster', models.BooleanField(default=False, verbose_name='Natural disaster')),
                ('title', models.CharField(max_length=255, verbose_name='Emergency name')),
                ('description', models.TextField(verbose_name='Description')),
                ('number_deaths', models.DecimalField(decimal_places=2, max_digits=16, verbose_name='Number of deaths')),
                ('number_injuries', models.DecimalField(decimal_places=2, max_digits=16, verbose_name='Number of injuries')),
                ('number_affected', models.DecimalField(decimal_places=2, max_digits=16, verbose_name='Affected')),
                ('number_displaced', models.DecimalField(decimal_places=2, max_digits=16, verbose_name='Displaced')),
                ('concurrent_emergencies', models.BooleanField(default=False, verbose_name='Is the affected population currently experiencing another classified emergency?')),
                ('possible_concurrent_emergency', models.BooleanField(default=False, verbose_name='Is any other area of the country (not the affected population) experiencing another classified emergency?')),
                ('rapid_access_possible', models.BooleanField(default=False, verbose_name='Does the IRC expect to be able to access the affected population within one week?')),
                ('registration_required', models.BooleanField(default=False, verbose_name='Is registration required?')),
                ('registration_possible', models.BooleanField(default=False, verbose_name='Does the IRC anticipate the ability to register in country?')),
                ('crisis_will_remain_same', models.BooleanField(default=False, verbose_name='Does the IRC expect the crisis to be as bad, or worse in 30 days?')),
                ('msf', models.BooleanField(default=True, verbose_name='MSF')),
                ('save', models.BooleanField(default=False, verbose_name='Save the Children')),
                ('world_vision', models.BooleanField(default=False, verbose_name='World Vision')),
                ('crs', models.BooleanField(default=False, verbose_name='CRS')),
                ('red_cross', models.BooleanField(default=False, verbose_name='IFRC/ICRC')),
                ('mercy_corps', models.BooleanField(default=False, verbose_name='Mercy Corps')),
                ('imc', models.BooleanField(default=False, verbose_name='IMC')),
            ],
        ),
    ]
