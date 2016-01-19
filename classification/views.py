from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponse
import json
from django.conf import settings
import os
import pandas

from oauth2_provider.models import Application

from . import utils
import tempfile

def index(request):
    application = Application.objects.get(name=getattr(settings, "OAUTH_APP_NAME", "OAuthApplication"))
    return render(request, 'index.html', {
        "oauth_application": application
    }, RequestContext(request))


def report(request):
    from .api import ScorecardSerializer
    from mapping import models

    serializer = ScorecardSerializer(models.Scorecard.objects.all(), many=True)
    scorecards = serializer.data
    for d in scorecards:
        d['worksheet'] = d['worksheet']['id']

    df = pandas.DataFrame.from_dict(scorecards)
    with tempfile.NamedTemporaryFile(suffix=".xlsx") as fobject:
        with pandas.ExcelWriter(fobject.name)as excel:
            df.to_excel(excel)
        fobject.seek(0)

        response_content = fobject.read()
        fobject.delete = True
    response = HttpResponse(response_content)
    filename = "report.xlsx"

    response['Content-Disposition'] = 'attachment; filename=' + filename
    response['Content-Type'] = 'application/vnd.ms-excel; charset=utf-16'
    return response
