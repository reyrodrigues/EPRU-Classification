# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 21:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0004_auto_20151214_2048'),
    ]

    operations = [
        migrations.RenameField(
            model_name='worksheet',
            old_name='save',
            new_name='sci',
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='concurrent_emergencies',
            field=models.BooleanField(default=False, verbose_name='Affected population is currently experiencing another classified emergency.'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='crisis_will_remain_same',
            field=models.BooleanField(default=False, verbose_name='The IRC expects the crisis to be as bad, or worse in 30 days.'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='description',
            field=models.TextField(help_text='Give a two sentence definition of the emergency.', verbose_name='Description'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='emergency_country',
            field=django_countries.fields.CountryField(help_text='In what country is the emergency?', max_length=2, verbose_name='Emergency country'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='generated_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='natural_disaster',
            field=models.BooleanField(default=False, help_text='Was it caused primarily by a natural disaster?', verbose_name='Natural disaster'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_affected',
            field=models.DecimalField(decimal_places=2, default=0, help_text='See notes on next page re: affected', max_digits=16, verbose_name='Affected'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_affected_source',
            field=models.URLField(blank=True, help_text='Copy the link for the number of affected here.', null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_deaths',
            field=models.DecimalField(decimal_places=2, default=0, help_text='How many deaths have been reported (in this country due to this emergency)?', max_digits=16, verbose_name='Number of deaths'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_deaths_source',
            field=models.URLField(blank=True, help_text='Copy the link for the source of the number of deaths here.\t', null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_displaced',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=16, verbose_name='Displaced'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_displaced_source',
            field=models.URLField(blank=True, help_text='Copy the link for the displaced here.', null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_injuries',
            field=models.DecimalField(decimal_places=2, default=0, help_text='How many injuries have been reported (in this country due to this emergency)?', max_digits=16, verbose_name='Number of injuries'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_injuries_source',
            field=models.URLField(blank=True, help_text='Copy the link for the source of the number of injuries here.\t', null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='origin_country',
            field=django_countries.fields.CountryField(blank=True, help_text='What is the primary country of origin of the affected?', max_length=2, null=True, verbose_name='Country of origin (if different)'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='possible_concurrent_emergency',
            field=models.BooleanField(default=False, verbose_name='Any other area of the country (not the affected population) is experiencing another classified emergency.'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='rapid_access_possible',
            field=models.BooleanField(default=False, verbose_name='The IRC expects to be able to access the affected population within one week.'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='registration_possible',
            field=models.BooleanField(default=False, verbose_name='The IRC anticipates the ability to register in country.'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='registration_required',
            field=models.BooleanField(default=False, verbose_name='Registration is required.'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='start',
            field=models.DateField(help_text='What is the start date of the emergency?', null=True, verbose_name='Start date of crisis'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='title',
            field=models.CharField(help_text='What is the name of the emergency?', max_length=255, verbose_name='Emergency name'),
        ),
    ]