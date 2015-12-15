from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'
from django.contrib import admin
from django import forms
from django.http import HttpResponseRedirect
from . import models
from django.utils.translation import ugettext as _


class WorksheetForm(forms.ModelForm):
    proportion_of_deaths = forms.DecimalField()
    proportion_of_affected = forms.DecimalField()
    proportion_of_injured = forms.DecimalField()
    proportion_of_idps = forms.DecimalField()
    pre_crisis_population = forms.DecimalField(localize=True)

    death_index = forms.IntegerField()
    death_proportion_index = forms.IntegerField()
    affected_index = forms.IntegerField()
    affected_proportion_index = forms.IntegerField()
    injured_index = forms.IntegerField()
    injured_proportion_index = forms.IntegerField()
    displaced_index = forms.IntegerField()
    displaced_proportion_index = forms.IntegerField()
    highest_index = forms.IntegerField(label=_('Scale & Severity Rank'))

    class Meta:
        exclude = ('is_locked',)
        model = models.Worksheet


class WorksheetAdmin(admin.ModelAdmin):
    form = WorksheetForm
    fieldsets = [
        (None, {'fields': ['emergency_country', 'origin_country']}),
        (None, {'fields': ['start', 'natural_disaster', 'title', 'description']}),
        ('Statistics', {'fields': [
            'pre_crisis_population',
            (
                'number_deaths',
                'death_index',
                'proportion_of_deaths',
                'death_proportion_index',
            ),

            'number_deaths_source',
            (
                'number_injuries',
                'injured_index',
                'proportion_of_injured',
                'injured_proportion_index',
            ),

            'number_injuries_source',

            (
                'number_affected',
                'affected_index',
                'proportion_of_affected',
                'affected_proportion_index',
            ),

            'number_affected_source',

            (
                'number_displaced',
                'displaced_index',
                'proportion_of_idps',
                'displaced_proportion_index',
            ),

            'number_displaced_source',

            'highest_index'
        ]}),
        ('Questionnaire', {'fields': [
            (
                'concurrent_emergencies',
                'possible_concurrent_emergency',
            ),
            (
                'rapid_access_possible',
                'registration_required',
            ),
            (
                'registration_possible',
                'crisis_will_remain_same',),
        ]}),
        ("""Are the following actors reportedly responding to the emergency,
        in similar locations and sectors that the IRC would plan to respond in?""",
         {'fields': [
             (
                 'msf',
                 'sci',
             ),
             (
                 'world_vision',
                 'crs',
             ),
             (
                 'red_cross',
                 'mercy_corps'
             ),
             'imc',

         ]}),
        ('Preparedness', {'fields': ['pre_crisis_vulnerability_rank', 'irc_robustness']})
    ]

    list_display = ('title', 'unlocked_by')

    def response_change(self, request, obj):
        """
        Overriding the default change response to allow the user to unlock object
        :param request:
        :param obj:
        :return:
        """
        if '_update' in request.POST:
            obj.is_locked = False
            obj.unlocked_by = request.user
            obj.save()

            return HttpResponseRedirect(obj.get_admin_url())
        else:
            return super(WorksheetAdmin, self).response_change(request, obj)

    def get_readonly_fields(self, request, obj=None):
        all_fields = reduce(lambda l, r: l + r, [a[1]['fields'] for a in self.fieldsets])
        fields = []
        for f in all_fields:
            if isinstance(f, tuple):
                fields += list(f)
            else:
                fields.append(f)
        if obj:
            if not (obj.unlocked_by and obj.unlocked_by == request.user):
                read_only_fields = set(fields)
            else:
                read_only_fields = []
        else:
            read_only_fields = []

        read_only_fields = list(read_only_fields) + [
            'pre_crisis_vulnerability_rank',
            'pre_crisis_population',
            'irc_robustness',
            'proportion_of_deaths',
            'proportion_of_injured',
            'proportion_of_affected',
            'proportion_of_idps',

            'death_index',
            'death_proportion_index',
            'affected_index',
            'affected_proportion_index',
            'injured_index',
            'injured_proportion_index',
            'displaced_index',
            'displaced_proportion_index',
            'highest_index',

        ]

        return set(read_only_fields)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.generated_by = request.user

        obj.is_locked = True
        obj.unlocked_by = None

        obj.populate_stats()

        super(WorksheetAdmin, self).save_model(request, obj, form, change)


admin.site.register(models.Worksheet, WorksheetAdmin)