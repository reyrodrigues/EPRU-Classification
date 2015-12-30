/**
 * Created by reyrodrigues on 12/25/15.
 */
angular
    .module('app')

    .factory('User', function ($resource) {
        return $resource('/api/users/:id/', { id: '@id' }, { }, {
            stripTrailingSlashes: false
        });
    })
;
