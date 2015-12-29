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


def index(request):
    application = Application.objects.get(name=getattr(settings, "OAUTH_APP_NAME", "OAuthApplication"))
    return render(request, 'index.html', {
        "oauth_application": application
    }, RequestContext(request))

