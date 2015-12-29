/**
 * Created by reyrodrigues on 12/25/15.
 */

angular.module('app')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state('app.map', {
                    url: '/map',
                    templateUrl: 'js/modules/map/tpl/map.html'
                })
                ;
        });
