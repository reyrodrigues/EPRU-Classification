from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^map/', views.map),
    url(r'^scale/', views.scale),
]