from __future__ import absolute_import, unicode_literals, division, print_function

__author__ = 'reyrodrigues'

from django.conf import settings
import urllib
import json
# import sys, itertool
# from ..auth import authenticate_user
from django.contrib.auth import get_user_model
import requests
import re

SUPPORT_SERVICE = "SupportData"
USER_SERVICE = "UserProfiles"

DATA_SERVICE = getattr(settings, 'DATA_SERVICE', {
    "URL_TEMPLATE": "https://otis.rescue.org/_data/Data/%(service)s/%(collection)s",
    "USER": "otis",
    "PASSWORD": "P@ssw0rd",
})


def request_user_service(**kwargs):
    url = DATA_SERVICE["URL_TEMPLATE"] % {"service": SUPPORT_SERVICE, "collection": USER_SERVICE}
    auth = (DATA_SERVICE["USER"], DATA_SERVICE["PASSWORD"])
    request = requests.get(url, auth=auth, headers={"accept": "application/json"}, **kwargs)

    return request


class IRCADAuthentication(object):
    def find_user_by_username(self, username):
        user_filter = {'$filter': "tolower(AccountName) eq '{}'".format(username.lower())}
        response = request_user_service(params=user_filter)

        if response.status_code == 200:
            odata_result = response.json()
            if odata_result and 'value' in odata_result:
                ad_users = odata_result['value']
                ad_user = ad_users[0]

                return ad_user

    def find_user_by_email(self, email):
        user_filter = {'$filter': "tolower(Email) eq '{}'".format(email.lower())}
        response = request_user_service(params=user_filter)

        if response.status_code == 200:
            odata_result = response.json()
            if odata_result and 'value' in odata_result:
                ad_users = odata_result['value']
                ad_user = ad_users[0]

                return ad_user

    def authenticate(self, username=None, password=None):
        try:
            if re.match(r'[^@]+@[^@]+\.[^@]+', username):
                ad_user = self.find_user_by_email(username)
            else:
                ad_user = self.find_user_by_username(username)

            username = ad_user['AccountName']
            email = ad_user['Email']
            first_name = ad_user['FirstName']
            last_name = ad_user['LastName']

            User = get_user_model()
            login_valid = username and password and self.authenticate_user(username, password)
            if login_valid:
                try:
                    user = User.objects.get(username=username)
                    user.email = email
                    user.first_name = first_name
                    user.last_name = last_name

                    user.set_password(password)
                    user.save()
                except User.DoesNotExist:
                    # Create a new user.
                    user = User(username=username)
                    user.email = email
                    user.first_name = first_name
                    user.last_name = last_name

                    user.set_password(password)
                    user.is_staff = True
                    user.save()
                return user
        except Exception:
            pass
        return None

    def get_user(self, user_id):
        User = get_user_model()

        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def authenticate_user(self, username, password):
        auth_server = getattr(settings, 'AUTH_SERVER', "auth.rescue.org")
        auth_port = getattr(settings, 'AUTH_PORT', "443")

        auth_url = "{}://{}/SimpleAuthenticationRESTService.aspx".format(
            "https" if auth_port == "443" else "http",
            auth_server
        )
        data = urllib.urlencode({'username': username, 'password': password, })
        headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
        r = requests.post(auth_url, headers=headers, data=data)

        response_json = json.loads(r.content)

        if response_json['result']:
            return response_json['result']
        else:
            return False