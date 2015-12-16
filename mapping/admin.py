from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'
from django.contrib import admin
from django import forms
from django.http import HttpResponseRedirect
from . import models
from django.db import transaction
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator


csrf_protect_m = method_decorator(csrf_protect)


class WorksheetForm(forms.ModelForm):
    class Meta:
        exclude = ('is_locked',)
        model = models.Worksheet


class ScorecardAdmin(admin.ModelAdmin):
    readonly_fields = (
        "worksheet",
        "emergency_classification_rank",
        "pre_crisis_vulnerability_rank",
        "irc_robustness",
        "complex",
        "access",
        "duration",
        "lack_of_actors",
        "recorded_decision",
        "recorded_management",
        "recorded_stance",
        "recorded_type",
        "title",
        "country",
        "start",
        "description",
    )
    fieldsets = [
        ("Emergency Details", {
            "fields": (
                "title",
                "country",
                "start",
                "description",
            )
        }),
        ("Emergency Classification", {
            "fields": (
                (
                    "emergency_classification_rank",
                    "pre_crisis_vulnerability_rank",
                    "complex",

                ),
            )
        }),
        ("Response Context", {
            "fields": (
                (
                    "irc_robustness",
                    "access",
                    "duration",
                    "lack_of_actors",
                ),
            )
        }),
        ("Response Decision", {'fields': (('recorded_decision', 'taken_decision'),)}),
        ("Response Management", {'fields': (('recorded_management', 'taken_management'),)}),
        ("Response Type", {'fields': (('recorded_type', 'taken_type'),)}),
        ("Response Type", {'fields': (('recorded_stance', 'taken_stance'),)}),
        (None, {'fields': (
            "caveats",
            "next_actions",
            "action_taken",
        )}),
    ]


class WorksheetAdmin(admin.ModelAdmin):
    form = WorksheetForm
    fieldsets = [
        (None, {'fields': ['emergency_country', 'origin_country']}),
        (None, {'fields': ['start', 'natural_disaster', 'title', 'description']}),
        ('Statistics', {'fields': [
            'pre_crisis_population',
            (
                'number_deaths',
                # 'proportion_of_deaths',
            ),

            'number_deaths_source',
            (
                'number_injuries',
                # 'proportion_of_injured',
            ),

            'number_injuries_source',

            (
                'number_affected',
                # 'proportion_of_affected',
            ),

            'number_affected_source',

            (
                'number_displaced',
                # 'proportion_of_displaced',
            ),

            'number_displaced_source',
        ]}),
        ('Questionnaire', {'fields': [
            'concurrent_emergencies',
            'possible_concurrent_emergency',
            'rapid_access_possible',
            'registration_required',
            'registration_possible',
            'crisis_will_remain_same',
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
    ]

    list_display = ('title', 'unlocked_by')

    @csrf_protect_m
    @transaction.atomic
    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        """
        Overriding the default change response to allow the user to unlock object
        :param request:
        :param obj:
        :return:
        """

        if '_createscorecard' in request.POST:
            obj = models.Worksheet.objects.get(id=object_id)
            scorecard = models.Scorecard.objects.create_from_worksheet(obj)

            return HttpResponseRedirect(scorecard.get_admin_url())
        if '_openscorecard' in request.POST:
            obj = models.Worksheet.objects.get(id=object_id)
            scorecard = list(obj.scorecards.all())[-1]

            return HttpResponseRedirect(scorecard.get_admin_url())
        if '_update' in request.POST:
            obj = models.Worksheet.objects.get(id=object_id)
            obj.is_locked = False
            obj.unlocked_by = request.user
            obj.save()

            return HttpResponseRedirect(obj.get_admin_url())
        else:
            return super(WorksheetAdmin, self).changeform_view(request, object_id, form_url, extra_context)

    def get_readonly_fields(self, request, obj=None):
        all_fields = reduce(lambda l, r: list(l) + list(r), [a[1]['fields'] for a in self.fieldsets])
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
            'proportion_of_displaced',

            'death_index',
            'death_proportion_index',
            'affected_index',
            'affected_proportion_index',
            'injured_index',
            'injured_proportion_index',
            'displaced_index',
            'displaced_proportion_index',
            'emergency_classification_rank',
            'is_complex',
            'lacks_actors',
            'access',
            'requires_response',
            'response_index',
            'epru_lead',
            'response_stance',
        ]

        return set(read_only_fields)

    def save_model(self, request, obj, form, change):
        if not change:
            obj.generated_by = request.user

        obj.is_locked = True
        obj.unlocked_by = None

        obj.populate_stats()

        models.Scorecard.objects.create_from_worksheet(obj)

        super(WorksheetAdmin, self).save_model(request, obj, form, change)


admin.site.register(models.Worksheet, WorksheetAdmin)
admin.site.register(models.Scorecard, ScorecardAdmin)