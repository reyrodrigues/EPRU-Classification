angular.module('app')

    .config(
        function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'js/modules/login/tpl/login.html'
                })
                ;
        });

;
