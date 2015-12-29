from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

import pandas
import os
import requests
import StringIO
from django.conf import settings
from django.core.cache import cache


def get_reference_data():
    """
    Downloads the data from box or somewhere else
    REFACTOR
    TODO: REFACTOR
    TO DO: REFACTOR
    :return:
    """
    classification_reference = os.path.join(settings.BASE_DIR, ('assets/classification.xls'))

    with open(classification_reference) as f:
        df = pandas.read_excel(f, 'Reference')

    return df


def get_lookup_tables():
    if 'LOOKUP_CONTENT' not in cache:
        r = requests.get(settings.LOOKUP_TABLES_URL)
        content = r.content
        cache.set('LOOKUP_CONTENT', content)
    else:
        content = cache.get('LOOKUP_CONTENT')

    decision_tree = pandas.read_excel(StringIO.StringIO(content), 'DecisionTree')
    thresholds = pandas.read_excel(StringIO.StringIO(content), 'Thresholds')
    decision_tree = decision_tree.ffill()

    return decision_tree, thresholds


