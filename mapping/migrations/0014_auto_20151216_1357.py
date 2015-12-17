# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-16 18:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0013_auto_20151215_1701'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scorecard',
            name='access',
            field=models.BooleanField(default=False, verbose_name='Access'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='complex',
            field=models.BooleanField(default=False, verbose_name='Is Complex'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='duration',
            field=models.BooleanField(default=False, verbose_name='Duration past 30 days'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='lack_of_actors',
            field=models.BooleanField(default=False, verbose_name='Lack of humanitarian actors'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='recorded_decision',
            field=models.PositiveIntegerField(blank=True, choices=[(2, 'The IRC country program will decide if they will respond'), (3, 'IRC will respond'), (1, 'IRC will not respond')], default=1, null=True, verbose_name='Recorded'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='recorded_management',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'Country program leads'), (2, 'EPRU leads')], default=0, null=True, verbose_name='Recorded'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='recorded_stance',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'Lower Level/One/A'), (2, 'Mid Level/Two/B'), (3, 'High Level/Three/C')], default=0, null=True, verbose_name='Recorded'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='recorded_type',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'One team'), (2, 'Two teams')], default=0, null=True, verbose_name='Recorded'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='taken_decision',
            field=models.PositiveIntegerField(blank=True, choices=[(2, 'The IRC country program will decide if they will respond'), (3, 'IRC will respond'), (1, 'IRC will not respond')], default=0, null=True, verbose_name='Taken'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='taken_management',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'Country program leads'), (2, 'EPRU leads')], default=0, null=True, verbose_name='Taken'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='taken_stance',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'Lower Level/One/A'), (2, 'Mid Level/Two/B'), (3, 'High Level/Three/C')], default=0, null=True, verbose_name='Taken'),
        ),
        migrations.AlterField(
            model_name='scorecard',
            name='taken_type',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'One team'), (2, 'Two teams')], default=0, null=True, verbose_name='Taken'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_affected_source',
            field=models.CharField(blank=True, help_text='Copy the link for the number of affected here.', max_length=1000, null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_deaths_source',
            field=models.CharField(blank=True, help_text='Copy the link for the source of the number of deaths here.\t', max_length=1000, null=True, verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='worksheet',
            name='number_displaced_source',
            field=models.CharField(blank=True, help_text='Copy the link for the displaced here.', max_length=1000, null=True, verbose_name='Source'),
        ),
    ]