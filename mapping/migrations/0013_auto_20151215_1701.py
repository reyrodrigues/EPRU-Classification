# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-15 22:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mapping', '0012_auto_20151215_1547'),
    ]

    operations = [
        migrations.CreateModel(
            name='Scorecard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emergency_classification_rank', models.IntegerField(blank=True, default=0, null=True, verbose_name='Emergency classification rank')),
                ('pre_crisis_vulnerability_rank', models.IntegerField(blank=True, default=0, null=True, verbose_name='Pre-crisis vulnerability rank')),
                ('irc_robustness', models.IntegerField(blank=True, default=0, null=True, verbose_name='IRC robustness')),
                ('complex', models.BooleanField(default=False)),
                ('access', models.BooleanField(default=False)),
                ('duration', models.BooleanField(default=False)),
                ('lack_of_actors', models.BooleanField(default=False)),
                ('recorded_decision', models.PositiveIntegerField(blank=True, choices=[(1, 'No'), (2, 'CP will decide'), (3, 'IRC will respond')], default=1, null=True)),
                ('recorded_management', models.PositiveIntegerField(blank=True, choices=[(1, 'Country program leads'), (2, 'EPRU leads')], default=0, null=True)),
                ('recorded_type', models.PositiveIntegerField(blank=True, choices=[(1, 'One team'), (2, 'Two teams')], default=0, null=True)),
                ('recorded_stance', models.PositiveIntegerField(blank=True, choices=[(1, 'Lower Level/One/A'), (2, 'Mid Level/Two/B'), (3, 'High Level/Three/C')], default=0, null=True)),
                ('taken_decision', models.PositiveIntegerField(blank=True, choices=[(1, 'No'), (2, 'CP will decide'), (3, 'IRC will respond')], default=0, null=True)),
                ('taken_management', models.PositiveIntegerField(blank=True, choices=[(1, 'Country program leads'), (2, 'EPRU leads')], default=0, null=True)),
                ('taken_type', models.PositiveIntegerField(blank=True, choices=[(1, 'One team'), (2, 'Two teams')], default=0, null=True)),
                ('taken_stance', models.PositiveIntegerField(blank=True, choices=[(1, 'Lower Level/One/A'), (2, 'Mid Level/Two/B'), (3, 'High Level/Three/C')], default=0, null=True)),
                ('caveats', models.TextField(blank=True, null=True)),
                ('next_actions', models.TextField(blank=True, null=True)),
                ('action_taken', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.AlterModelOptions(
            name='worksheet',
            options={'permissions': (('unlock_worksheet', 'Can update worksheet'), ('generate_scorecard', 'Can generate scorecard'))},
        ),
        migrations.AddField(
            model_name='scorecard',
            name='worksheet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scorecards', to='mapping.Worksheet'),
        ),
    ]
