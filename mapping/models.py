from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.db import models
from django_countries.fields import CountryField
from django.utils.translation import ugettext as _
from django.conf import settings
from .utils import get_reference_data


class AdminUrlMixin:
    def get_admin_url(self):
        from django.contrib.contenttypes.models import ContentType
        from django.core import urlresolvers

        content_type = ContentType.objects.get_for_model(self.__class__)
        return urlresolvers.reverse("admin:%s_%s_change" % (content_type.app_label, content_type.model),
                                    args=(self.id,))


class Worksheet(models.Model, AdminUrlMixin):
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

    number_displaced = models.IntegerField(default=0, verbose_name=_('Displaced'),
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
    emergency_classification_rank = models.IntegerField(default=0, null=True, blank=True,
                                                        verbose_name=_("Emergency classification rank"), )
    pre_crisis_vulnerability_rank = models.IntegerField(default=0, null=True, blank=True,
                                                        verbose_name=_("Pre-crisis vulnerability rank"), )
    pre_crisis_population = models.IntegerField(default=0, null=True, blank=True,
                                                verbose_name=_("Pre-crisis population"), )
    irc_robustness = models.IntegerField(default=0, null=True, blank=True, verbose_name=_("IRC robustness"), )

    def _get_lookup_data(self):
        if not hasattr(self, '_lookup_data'):
            from . import utils

            self._lookup_data = utils.get_lookup_tables()

        return self._lookup_data

    def _get_index_from_lookup(self, index, prop):
        p_value = getattr(self, prop)
        if p_value == 0:
            return 0

        dt, th = self._get_lookup_data()

        filtered = th[(th[index] < p_value)].sort_values('Scale', ascending=False).head(1)

        if not filtered.empty:
            return filtered['Scale'].values[0]
        else:
            return 0

    def _get_response_index(self):
        dt, th = self._get_lookup_data()
        filtered = dt[
            (dt['Scale'] == self.emergency_classification_rank) &
            (dt['PreVulnerability'] == self.pre_crisis_vulnerability_rank) &
            (dt['IRCR'] == self.irc_robustness) &
            (dt['Actors'] == ('L' if self.lacks_actors else 'N'))
        ]
        if not filtered.empty:
            if self.natural_disaster:
                return filtered.head(1)['Natural'].values[0]
            else:
                return filtered.head(1)['Conflict'].values[0]
        return 0

    @property
    def proportion_of_deaths(self):
        if not self.pre_crisis_population:
            return 0

        return round(self.number_deaths / self.pre_crisis_population * 10000, 2)

    @property
    def proportion_of_affected(self):
        if not self.pre_crisis_population:
            return 0

        return round(self.number_affected / self.pre_crisis_population * 10000, 2)

    @property
    def proportion_of_injured(self):
        if not self.pre_crisis_population:
            return 0

        return round(self.number_injuries / self.pre_crisis_population * 10000, 2)

    @property
    def proportion_of_displaced(self):
        if not self.pre_crisis_population:
            return 0

        return round(self.number_displaced / self.pre_crisis_population * 10000, 2)

    @property
    def death_index(self):
        return self._get_index_from_lookup('Deaths', 'number_deaths')

    @property
    def death_proportion_index(self):
        return self._get_index_from_lookup('PropDeaths', 'proportion_of_deaths')

    @property
    def affected_index(self):
        return self._get_index_from_lookup('Affected', 'number_affected')

    @property
    def affected_proportion_index(self):
        return self._get_index_from_lookup('PropAffected', 'proportion_of_affected')

    @property
    def injured_index(self):
        return self._get_index_from_lookup('Injuries', 'number_injuries')

    @property
    def injured_proportion_index(self):
        return self._get_index_from_lookup('PropInjuries', 'proportion_of_injured')

    @property
    def displaced_index(self):
        if self.emergency_country == self.origin_country or not self.origin_country:  # IDPs
            return self._get_index_from_lookup('Displaced', 'number_displaced')
        else:  # refugees
            return self._get_index_from_lookup('Refugees', 'number_displaced')


    @property
    def displaced_proportion_index(self):
        if self.emergency_country == self.origin_country or not self.origin_country:  # IDPs
            return self._get_index_from_lookup('PropDisplaced', 'proportion_of_displaced')
        else:  # refugees
            return self._get_index_from_lookup('PropRefugees', 'proportion_of_displaced')

    def calculate_rank(self):
        scale = [self.death_index, self.death_proportion_index, self.affected_index, self.affected_proportion_index,
                 self.injured_index, self.injured_proportion_index, self.displaced_index,
                 self.displaced_proportion_index]
        return (sorted(scale, reverse=True) or [0])[0]

    @property
    def is_complex(self):
        return self.concurrent_emergencies or self.possible_concurrent_emergency

    @property
    def lacks_actors(self):
        return sum([
            (self.msf and 1 or 0),
            (self.sci and 1 or 0),
            (self.world_vision and 1 or 0),
            (self.red_cross and 1 or 0),
            (self.crs and 1 or 0),
            (self.mercy_corps and 1 or 0),
            (self.imc and 1 or 0),
        ]) < 4

    @property
    def access(self):
        return self.rapid_access_possible and (self.registration_possible or not self.registration_required)

    @property
    def requires_response(self):
        cp_decides = self._get_response_index() == 1
        yes = self._get_response_index() > 1
        return 2 if cp_decides else (3 if yes else 1)

    @property
    def response_index(self):
        return self._get_response_index()

    @property
    def epru_lead(self):
        return self._get_response_index() == 3

    @property
    def response_stance(self):
        combined = self.pre_crisis_vulnerability_rank + self.emergency_classification_rank
        return 3 if combined >= 12 else (2 if combined >= 10 else 1)

    def populate_stats(self):
        df = get_reference_data()

        result = df[(df['ISO'] == self.emergency_country.alpha3)].head(1)
        if not result.empty:
            result = result.to_dict('records')[0]
            self.pre_crisis_vulnerability_rank = result['Factorgp']
            self.pre_crisis_population = result['pop']
            self.irc_robustness = result['IRCR']
            self.emergency_classification_rank = self.calculate_rank()


    def __str__(self):
        return "{}, {}: {}".format(
            self.emergency_country,
            self.start,
            self.title
        ).encode('ascii')


    class Meta:
        permissions = (
            ("unlock_worksheet", "Can update worksheet"),
            ("generate_scorecard", "Can generate scorecard"),
        )


class ScorecardManager(models.Manager):
    def create_from_worksheet(self, worksheet):
        instance = self.create(
            worksheet=worksheet,
            emergency_classification_rank=worksheet.emergency_classification_rank,
            pre_crisis_vulnerability_rank=worksheet.pre_crisis_vulnerability_rank,
            irc_robustness=worksheet.irc_robustness,
            complex=worksheet.is_complex,
            access=worksheet.access,
            duration=worksheet.crisis_will_remain_same,
            lack_of_actors=worksheet.lacks_actors,

            recorded_decision=worksheet.requires_response,
            recorded_management=2 if worksheet.epru_lead else 1,
            recorded_stance=worksheet.response_stance,
        )

        instance.save()
        return instance


DECISION_CHOICES = (
    (2, 'The IRC country program will decide if they will respond'),
    (3, 'IRC will respond'),
    (1, 'IRC will not respond'),
)
MANAGEMENT_CHOICES = (
    (1, 'Country program leads'),
    (2, 'EPRU leads'),
)

TEAM_CHOICES = (
    (1, 'One team'),
    (2, 'Two teams'),
)
STANCE_CHOICES = (
    (1, 'Lower Level/One/A'),
    (2, 'Mid Level/Two/B'),
    (3, 'High Level/Three/C'),
)


class Scorecard(models.Model, AdminUrlMixin):
    worksheet = models.ForeignKey('Worksheet', related_name='scorecards')

    emergency_classification_rank = models.IntegerField(default=0, null=True, blank=True,
                                                        verbose_name=_("Emergency classification rank"), )
    pre_crisis_vulnerability_rank = models.IntegerField(default=0, null=True, blank=True,
                                                        verbose_name=_("Pre-crisis vulnerability rank"), )
    irc_robustness = models.IntegerField(default=0, null=True, blank=True, verbose_name=_("IRC robustness"), )

    complex = models.BooleanField(default=False, verbose_name=_('Is Complex'), )
    access = models.BooleanField(default=False, verbose_name=_('Access'), )
    duration = models.BooleanField(default=False, verbose_name=_('Duration past 30 days'), )
    lack_of_actors = models.BooleanField(default=False, verbose_name=_('Lack of humanitarian actors'), )

    recorded_decision = models.PositiveIntegerField(default=1, null=True, blank=True, choices=DECISION_CHOICES,
                                                    verbose_name=_('Recorded'))
    recorded_management = models.PositiveIntegerField(default=0, null=True, blank=True, choices=MANAGEMENT_CHOICES,
                                                      verbose_name=_('Recorded'))
    recorded_type = models.PositiveIntegerField(default=0, null=True, blank=True, choices=TEAM_CHOICES,
                                                verbose_name=_('Recorded'))
    recorded_stance = models.PositiveIntegerField(default=0, null=True, blank=True, choices=STANCE_CHOICES,
                                                  verbose_name=_('Recorded'))

    taken_decision = models.PositiveIntegerField(default=0, null=True, blank=True, choices=DECISION_CHOICES,
                                                 verbose_name=_('Taken'))
    taken_management = models.PositiveIntegerField(default=0, null=True, blank=True, choices=MANAGEMENT_CHOICES,
                                                   verbose_name=_('Taken'))
    taken_type = models.PositiveIntegerField(default=0, null=True, blank=True, choices=TEAM_CHOICES,
                                             verbose_name=_('Taken'))
    taken_stance = models.PositiveIntegerField(default=0, null=True, blank=True, choices=STANCE_CHOICES,
                                               verbose_name=_('Taken'))

    caveats = models.TextField(blank=True, null=True)
    next_actions = models.TextField(blank=True, null=True)
    action_taken = models.TextField(blank=True, null=True)

    @property
    def title(self):
        return self.worksheet.title

    @property
    def description(self):
        return self.worksheet.description
    @property
    def start(self):
        return self.worksheet.start
    @property
    def country(self):
        return self.worksheet.emergency_country.name

    def __str__(self):
        return self.worksheet.title.encode('utf8')

    objects = ScorecardManager()

