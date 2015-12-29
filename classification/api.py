from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from rest_framework import viewsets, serializers, filters

from mapping import models
from django.contrib.auth import get_user_model
from rest_framework.response import Response


class DateTimeToDateField(serializers.DateField):
    def to_internal_value(self, value):
        if 't' in unicode(value).lower():
            value = unicode(value).lower().split('t')[0]
        return super(DateTimeToDateField, self).to_internal_value(value)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ('password',)


class ScorecardSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Scorecard


class WorksheetSerializer(serializers.ModelSerializer):
    emergency_country = serializers.CharField(max_length=100)
    origin_country = serializers.CharField(max_length=100, required=False, allow_blank=True)
    start = DateTimeToDateField()
    scorecard = ScorecardSerializer(required=False, read_only=True, allow_null=True)

    class Meta:
        model = models.Worksheet


class WorksheetViewSet(viewsets.ModelViewSet):
    queryset = models.Worksheet.objects.all()
    serializer_class = WorksheetSerializer
    ordering_fields = '__all__'



class ScorecardViewSet(viewsets.ModelViewSet):
    queryset = models.Scorecard.objects.all()
    serializer_class = ScorecardSerializer
    ordering_fields = '__all__'


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        if 'pk' in kwargs and kwargs['pk'] == 'me':
            user = self.get_queryset().get(id=request.user.id)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            return super(UserViewSet, self).retrieve(request, *args, **kwargs)


from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'worksheets', WorksheetViewSet)
router.register(r'scorecards', ScorecardViewSet)
router.register(r'users', UserViewSet)
