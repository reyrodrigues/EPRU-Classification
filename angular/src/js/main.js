'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl',
    function ($scope, $rootScope, $localStorage, $window, $mdSidenav, $state, User) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        $rootScope.config = "HELLO!";
        // config
        $rootScope.app = {
            name: 'Classification',
            version: '0.0.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            }
        };

        User.get({id: 'me'}).$promise.then(function (currentUser) {
            $rootScope.currentUser = currentUser.toJSON();
            $rootScope.isReviewer = $rootScope.currentUser.groups.filter(function (g) {
                return g.name == 'Reviewer'
            }).length > 0;
            $rootScope.isClassifier = $rootScope.currentUser.groups.filter(function (g) {
                return g.name == 'Classifier'
            }).length > 0;
        });

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }


    }
);
