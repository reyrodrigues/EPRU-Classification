from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'
from django.shortcuts import render, redirect
from django.template import RequestContext
from django.http import HttpResponse
import pandas
import json
from django.conf import settings
import os


def map(request):
    return render(request, 'map.html', {}, RequestContext(request))

def scale(request):
    classification_reference = os.path.join(settings.BASE_DIR, ('assets/classification.xls'))
    geojson_boundaries = os.path.join(settings.BASE_DIR, ('assets/countries.geo.json'))

    with open(classification_reference) as f:
        df = pandas.read_excel(f, 'Reference')
    with open(geojson_boundaries) as f:
        geo = json.load(f)

    for f in geo['features']:
        iso = f['id']
        country_data = df[(df['ISO'] == iso)].head(1).to_dict('records')
        if country_data:
            f['properties'].update({
                'FactorGP': country_data[0]['Factorgp'],
                'IRCR': country_data[0]['IRCR'],
            })

    return HttpResponse(json.dumps(geo), 'application/json')