from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

import pandas
import os
from django.conf import settings

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