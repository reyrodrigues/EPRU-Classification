angular.module('app')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'js/modules/dashboard/tpl/dashboard.html'
                })

        });
