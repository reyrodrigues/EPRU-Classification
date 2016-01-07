'use strict';
/* global window */

angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.jq',
    'ngMaterial',
    'ui.calendar',
    'ui.grid',
    'nemLogging',
    'ui-leaflet',
    'angular-oauth2',
    'ui.grid.pagination'
]);

// config

var app =
        angular.module('app')
            .config(
            [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

                    // lazy controller, directive and service
                    app.controller = $controllerProvider.register;
                    app.directive = $compileProvider.directive;
                    app.filter = $filterProvider.register;
                    app.factory = $provide.factory;
                    app.service = $provide.service;
                    app.constant = $provide.constant;
                    app.value = $provide.value;
                }
            ])
            .factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
                return {
                    response: function (response) {
                        if (response.status === 401) {
                        }
                        return response || $q.when(response);
                    },
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $location.path('/login').search('returnTo', $location.path());
                        }
                        if (rejection.status === 403) {
                            $location.path('/login').search('returnTo', $location.path());
                        }
                        return $q.reject(rejection);
                    }
                }
            }])

            .config(function (OAuthProvider, OAuthTokenProvider, $httpProvider) {
                OAuthProvider.configure({
                    baseUrl: (location.origin || location.protocol + '//' + location.host),
                    clientId: window.clientId,
                    clientSecret: window.clientSecret,
                    grantPath: '/o/token/',
                    revokePath: '/o/revoke/'
                });


                OAuthTokenProvider.configure({
                    name: 'token',
                    options: {
                        secure: location.protocol == 'https'
                    }
                });

                $httpProvider.interceptors.push('authHttpResponseInterceptor');

            })

            .run(function ($rootScope, $state, OAuth) {
                $rootScope.$on('oauth:error', function (event, rejection) {
                    if ('invalid_grant' === rejection.data.error) {
                        return;
                    }

                    if ('invalid_token' === rejection.data.error) {
                        return OAuth.getRefreshToken();
                    }

                    return $state.go('login');
                });
            })
            .config(function ($mdThemingProvider) {
            })
    ;


