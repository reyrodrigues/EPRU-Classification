from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'
from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponse
import json
from django.conf import settings
import os
import pandas

from . import utils

def map(request):
    return render(request, 'map.html', {}, RequestContext(request))


def scale(request):
    geojson_boundaries = os.path.join(settings.BASE_DIR, ('assets/countries.geo.json'))

    with open(geojson_boundaries) as f:
        geo = json.load(f)

    df = utils.get_reference_data()

    for f in geo['features']:
        iso = f['id']
        country_data = df[(df['ISO'] == iso)].head(1).to_dict('records')
        if country_data:
            f['properties'].update({
                'countryData': country_data[0]
            })

    return HttpResponse(json.dumps(geo), 'application/json')