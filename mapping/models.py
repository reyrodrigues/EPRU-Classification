from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.db import models
from django_countries.fields import CountryField
from django.utils.translation import ugettext as _
from django.conf import settings
from .utils import get_reference_data

DEATH_SCALE = [100, 2000, 2500, 4000, 6000, 7500, 35000, 60000, 100000, 200000]
DEATH_PROP_SCALE = [0.05, 0.45, 0.7, 1.2, 2.5, 6, 12, 16, 45, 100]
AFFECTED_SCALE = [1500, 6000, 10000, 15000, 70000, 165000, 1000000, 1500000, 4000000, 5650000]
AFFECTED_PROP_SCALE = [0.2, 1.3, 2.1, 3.5, 35, 132, 460, 700, 3000, 5000]
IDP_SCALE = [2500, 5000, 10000, 25000, 75000, 175000, 500000, 1200000, 1500000, 2500000]
IDP_PROP_SCALE = [0.5, 1, 3, 20, 25, 100, 450, 550, 650, 2500]
INJURIES_SCALE = [1000, 3200, 5500, 7500, 9500, 14500, 30000, 112000, 200000, 700000]
INJURIES_PROP_SCALE = [0.15, 0.8, 1.4, 2.4, 4, 10, 24, 40, 85, 400]


class Worksheet(models.Model):
    # metadata about location
    emergency_country = CountryField(null=False, verbose_name=_('Emergency country'),
                                     help_text=_('In what country is the emergency?'))
    origin_country = CountryField(null=True, blank=True, verbose_name=_('Country of origin (if different)'),
                                  help_text=_('What is the primary country of origin of the affected?'))

    # metadata about timing and scope
    start = models.DateField(null=True, verbose_name=_('Start date of crisis'),
                             help_text=_('What is the start date of the emergency?'))
    natural_disaster = models.BooleanField(default=False, verbose_name=_('Natural disaster'),
                                           help_text=_('Was it caused primarily by a natural disaster?'))

    # metadata
    title = models.CharField(max_length=255, null=False, blank=False, verbose_name=_('Emergency name'),
                             help_text=_('What is the name of the emergency?'))
    description = models.TextField(null=False, blank=False, verbose_name=_('Description'),
                                   help_text=_('Give a two sentence definition of the emergency.'))

    # statistics
    number_deaths = models.IntegerField(default=0, verbose_name=_('Number of deaths'),
                                        help_text=_(
                                            'How many deaths have been reported (in this country due to this emergency)?'))
    number_deaths_source = models.URLField(verbose_name=_("Source"), blank=True, null=True, help_text=_(
        'Copy the link for the source of the number of deaths here.	'))

    number_injuries = models.IntegerField(default=0,
                                          verbose_name=_('Number of injuries'), help_text=_(
            'How many injuries have been reported (in this country due to this emergency)?'))
    number_injuries_source = models.URLField(verbose_name=_("Source"), blank=True, null=True, help_text=_(
        'Copy the link for the source of the number of injuries here.	'), )

    number_affected = models.IntegerField(default=0, verbose_name=_('Affected'),
                                          help_text=_('See notes on next page re: affected'))
    number_affected_source = models.URLField(verbose_name=_("Source"), blank=True, null=True,
                                             help_text=_('Copy the link for the number of affected here.'), )

    number_displaced = models.IntegerField(default=0,  verbose_name=_('Displaced'),
                                           help_text=_(''))
    number_displaced_source = models.URLField(verbose_name=_("Source"), blank=True, null=True,
                                              help_text=_('Copy the link for the displaced here.'), )

    # decision points
    concurrent_emergencies = models.BooleanField(
        default=False,
        verbose_name=_(
            'Affected population is currently experiencing another classified emergency.'
        ), help_text=_(''),
    )
    possible_concurrent_emergency = models.BooleanField(
        default=False,
        verbose_name=_(
            'Any other area of the country (not the affected population) is experiencing another classified emergency.'
        ), help_text=_(''),
    )
    rapid_access_possible = models.BooleanField(
        default=False,
        verbose_name=_('The IRC expects to be able to access the affected population within one week.'),
        help_text=_(''),
    )
    registration_required = models.BooleanField(
        default=False,
        verbose_name=_('Registration is required.'),
        help_text=_(''),
    )
    registration_possible = models.BooleanField(
        default=False,
        verbose_name=_('The IRC anticipates the ability to register in country.'),
        help_text=_(''),
    )
    crisis_will_remain_same = models.BooleanField(
        default=False,
        verbose_name=_('The IRC expects the crisis to be as bad, or worse in 30 days.'),
        help_text=_(''),
    )

    # other actors
    msf = models.BooleanField(default=True, verbose_name=_("MSF"), help_text=_(''), )
    sci = models.BooleanField(default=False, verbose_name=_("Save the Children"), help_text=_(''), )
    world_vision = models.BooleanField(default=False, verbose_name=_("World Vision"), help_text=_(''), )
    crs = models.BooleanField(default=False, verbose_name=_("CRS"), help_text=_(''), )
    red_cross = models.BooleanField(default=False, verbose_name=_("IFRC/ICRC"), help_text=_(''), )
    mercy_corps = models.BooleanField(default=False, verbose_name=_("Mercy Corps"), help_text=_(''), )
    imc = models.BooleanField(default=False, verbose_name=_("IMC"), help_text=_(''), )

    created_on = models.DateTimeField(null=True, auto_now_add=True, auto_created=True)
    modified_on = models.DateTimeField(null=True, auto_now=True, auto_created=True)
    generated_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True)

    is_locked = models.BooleanField(default=True)
    unlocked_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, verbose_name=_('Being edited by'),
                                    related_name="locked_worksheets", )

    # Fields that are copied from reference tables
    pre_crisis_vulnerability_rank = models.IntegerField(default=0, null=True,
                                                        verbose_name=_("Pre-crisis vulnerability rank"), )
    pre_crisis_population = models.IntegerField(default=0, null=True, verbose_name=_("Pre-crisis population"), )
    irc_robustness = models.IntegerField(default=0, null=True, verbose_name=_("IRC robustness"), )

    @property
    def proportion_of_deaths(self):
        if self.pre_crisis_population == 0:
            return 0

        return round(self.number_deaths / self.pre_crisis_population * 10000, 2)

    @property
    def proportion_of_affected(self):
        if self.pre_crisis_population == 0:
            return 0

        return round(self.number_affected / self.pre_crisis_population * 10000, 2)

    @property
    def proportion_of_injured(self):
        if self.pre_crisis_population == 0:
            return 0

        return round(self.number_injuries / self.pre_crisis_population * 10000, 2)

    @property
    def proportion_of_idps(self):
        if self.pre_crisis_population == 0:
            return 0

        return round(self.number_displaced / self.pre_crisis_population * 10000, 2)

    @property
    def death_index(self):
        if self.number_deaths == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(DEATH_SCALE) if a < self.number_deaths]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def death_proportion_index(self):
        if self.proportion_of_deaths == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(DEATH_PROP_SCALE) if a < self.proportion_of_deaths]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def affected_index(self):
        if self.number_affected == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(AFFECTED_SCALE) if a < self.number_affected]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def affected_proportion_index(self):
        if self.proportion_of_affected == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(AFFECTED_PROP_SCALE) if a < self.proportion_of_affected]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def injured_index(self):
        if self.number_injuries == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(INJURIES_SCALE) if a < self.number_injuries]
        return (sorted(scale, reverse=True) or [0])[0]

    @property
    def injured_proportion_index(self):
        if self.proportion_of_injured == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(INJURIES_PROP_SCALE) if a < self.proportion_of_injured]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def displaced_index(self):
        if self.number_displaced == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(IDP_SCALE) if a < self.number_displaced]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def displaced_proportion_index(self):
        if self.proportion_of_idps == 0:
            return 0

        scale = [i + 1 for i, a in enumerate(IDP_PROP_SCALE) if a < self.proportion_of_idps]
        return (sorted(scale, reverse=True) or [0])[0] 

    @property
    def highest_index(self):
        scale = [self.death_index, self.death_proportion_index, self.affected_index, self.affected_proportion_index,
                 self.injured_index, self.injured_proportion_index, self.displaced_index,
                 self.displaced_proportion_index]
        return (sorted(scale, reverse=True) or [0])[0] 

    def populate_stats(self):
        df = get_reference_data()

        result = df[(df['ISO'] == self.emergency_country.alpha3)].head(1)
        if not result.empty:
            result = result.to_dict('records')[0]
            self.pre_crisis_vulnerability_rank = result['Factorgp']
            self.pre_crisis_population = result['pop']
            self.irc_robustness = result['IRCR']


    def get_admin_url(self):
        from django.contrib.contenttypes.models import ContentType
        from django.core import urlresolvers

        content_type = ContentType.objects.get_for_model(self.__class__)
        return urlresolvers.reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model),
                                    args=(self.id,))


    def __str__(self):
        return "{}, {}: {}".format(
            self.emergency_country,
            self.start,
            self.title
        ).encode('ascii')


    class Meta:
        permissions = (
            ("unlock_worksheet", "Can update worksheet"),
        )