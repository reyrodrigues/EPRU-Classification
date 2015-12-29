angular.module('app')
    .config(
        function ($stateProvider) {
            $stateProvider
                .state('app.grid', {
                    url: '/grid',
                    template: '<div ui-view></div>'
                })
                .state('app.grid.gridDemo', {
                    url: '/grid-demo',
                    templateUrl: 'js/modules/grid/tpl/grid-demo.html'
                })
                .state('app.grid.foodtableDemo', {
                    url: '/footable-demo',
                    templateUrl: 'js/modules/grid/tpl/footable-demo.html'
                })
                ;
        });
