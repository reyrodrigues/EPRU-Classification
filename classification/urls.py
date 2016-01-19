from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.conf.urls import url, include
from . import views
from . import api

urlpatterns = [
    url(r'^api/', include(api.router.urls)),
    url(r'^report/$', views.report),
    url(r'^$', views.index),
]