/**
 * Created by reyrodrigues on 12/25/15.
 */
var defaultOptions = {
    metadata: {method: 'OPTIONS', transformResponse: ReadOption},
    'save': {method: 'PUT', transformRequest: MapRequest, transformResponse: MapGet},
    'create': {method: 'POST', transformRequest: MapRequest, transformResponse: MapGet},
    'get': {method: 'GET', transformResponse: MapGet},
    'query': {method: 'GET', isArray: false}

};

angular
    .module('app')

    .factory('Worksheet', function ($resource) {
        return $resource('/api/worksheets/:id/', { id: '@id' }, defaultOptions, {
            stripTrailingSlashes: false
        });
    })
    .factory('Scorecard', function ($resource) {
        return $resource('/api/scorecards/:id/', { id: '@id' }, defaultOptions, {
            stripTrailingSlashes: false
        });
    })
;

function ReadOption(data, headers) {
    var json = angular.fromJson(data);
    return json.actions.POST;
}

function MapGet(data, headers) {
    var dateRegex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
    var json = angular.fromJson(data);

    for (var key in json) {
        if (dateRegex.test(json[key])) {
            json[key] = moment(json[key]).toDate();
        }

    }
    return json;
}
function MapRequest(data, headers) {
    var json = angular.toJson(data);
    console.log(json);
    return json;
}