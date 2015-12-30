from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'
from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponse
import json
from django.conf import settings
import os
import copy

def map(request):
    return render(request, 'map.html', {}, RequestContext(request))


def scale(request):
    geojson_boundaries = os.path.join(settings.BASE_DIR, ('assets/countries.geo.json'))

    with open(geojson_boundaries) as f:
        geo = json.load(f)

    new_features = []
    for f in geo['features']:
        if f['geometry']['type'] == "MultiPolygon":
            f['geometry']['type'] = "Polygon"
            coordinates = f['geometry'].pop('coordinates')
            f['geometry']['coordinates'] = coordinates.pop()
            for c in coordinates:
                new_feature = copy.deepcopy(f)

                new_feature['geometry']['coordinates'] = c
                new_features.append(new_feature)

    geo['features'] += new_features

    return HttpResponse(json.dumps(geo), 'application/json')