/**
 * Created by reyrodrigues on 12/25/15.
 */
/**
 * Created by reyrodrigues on 12/25/15.
 */

angular.module('app')
    .config(
    function ($stateProvider) {
        $stateProvider
            .state('app.worksheets', {
                url: '/worksheets',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.worksheets.list', {
                url: '/list',
                templateUrl: 'js/modules/classification/tpl/worksheets.list.html'
            })
            .state('app.worksheets.create', {
                url: '/create',
                templateUrl: 'js/modules/classification/tpl/worksheets.edit.html',
                controller: 'CreateWorksheetController'
            })
            .state('app.worksheets.edit', {
                url: '/edit/:id',
                templateUrl: 'js/modules/classification/tpl/worksheets.edit.html',
                controller: 'EditWorksheetController'
            })


            .state('app.scorecards', {
                url: '/scorecards',
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state('app.scorecards.list', {
                url: '/list',
                templateUrl: 'js/modules/classification/tpl/worksheets-list.html'
            })
            .state('app.scorecards.create', {
                url: '/create',
                templateUrl: 'js/modules/classification/tpl/worksheets-list.html'
            })
            .state('app.scorecards.edit', {
                url: '/edit/:id',
                templateUrl: 'js/modules/classification/tpl/worksheets-list.html'
            })
        ;
    });

