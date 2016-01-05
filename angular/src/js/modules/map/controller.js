/**
 * Created by reyrodrigues on 12/25/15.
 */

var colors = [
    "#FFFF66",
    "#F2E65C",
    "#E6CC52",
    "#D9B247",
    "#CC993D",
    "#C08033",
    "#B36629",
    "#A64D1F",
    "#993314",
    "#8D190A",
    "#800000"
];
var stanceColors = [
    "#FFFF66",
    "#F2E65C",
    "#C08033",
    "#8D190A",
];
var stanceWording = [
    "#FFFF66",
    "A",
    "B",
    "C",
];

angular
    .module('app')
    .controller('MapController', function MapController($scope, $http, leafletData, OAuth, Scorecard, $q, $mdDialog) {
        $scope.defaults = {
            tileLayer: '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            path: {
            },
            legend: {
                position: 'topright',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
            },
            minZoom: 3,
            worldCopyJump: true
        };

        $scope.center = {
            lat: 0.0,
            lng: 0.0,
            zoom: 3
        };

        $scope.colors = colors;
        $scope.stanceColors = stanceColors;
        $scope.stanceWording = stanceWording;

        var countryMap = isoCountriesCodes.reduce(function (obj, b) {
            obj[b[0]] = b[1];
            return obj;
        }, {});

        var reverseCountryMap = isoCountriesCodes.reduce(function (obj, b) {
            obj[b[1]] = b[0];
            return obj;
        }, {});

        $scope.scorecards = Scorecard.query({limit: 1000});

        var loaded = $q.all([$http.get('/scale/').then(function (r) {
            $scope.worldJson = r.data;
        }),
            $scope.scorecards.$promise
        ]);


        $scope.$watch('scale', function showScale(scale) {
            $q.when(loaded).then(function () {
                leafletData.getMap('map').then(function (map) {
                    var results = $scope.scorecards.results;
                    results.sort(function (a, b) {
                        return a.worksheet.start > b.worksheet.start ? 1 :
                            (a.worksheet.start == b.worksheet.start ? 0 : -1);
                    });

                    if ($scope.world)
                        map.removeLayer($scope.world);

                    $scope.world = getLayer(results, scale);
                    $scope.world.addTo(map);


                    $scope.world.on('click', onMapClick)
                    map.off('drag');
                    map.off('drag', function () {
                        $scope.world.addTo(map);

                    });

                    function onMapClick(e) {
                        var knn = leafletKnn($scope.world);

                        var id = e.layer.feature.id;
                        var props = e.layer.feature.properties;

                        var iso2 = reverseCountryMap[id];
                        var countryScorecards = $scope.scorecards.results.filter(function (s) {
                            return s.worksheet.emergency_country == iso2;
                        });

                        var confirm = $mdDialog.show({
                            targetEvent: e.originalEvent,
                            templateUrl: 'js/modules/map/tpl/countryDialog.html',
                            controller: function DialogController($scope, $state, $mdDialog) {
                                $scope.props = props;
                                $scope.scorecards = countryScorecards;

                                $scope.open = function (obj) {
                                    $mdDialog.hide().then(function () {
                                        $state.go('app.scorecards.edit', obj)
                                    });
                                };
                                $scope.hide = function () {
                                    $mdDialog.hide();
                                };
                            },
                            locals: { props: props, scorecards: countryScorecards }
                        });

                        confirm.then(function () {
                        }, function () {
                        });
                    }
                });
            });

        });

        function getLayer(data, scale) {
            angular.forEach(data, function (d) {
                var countryISO3 = countryMap[d.worksheet.emergency_country];
                var country = $scope.worldJson.features.filter(function (a) {
                    return a.id == countryISO3
                });

                if (country && country.length) {
                    angular.forEach(country, function (c) {
                        c.properties.value = scale ? d.emergency_classification_rank : d.taken_stance;
                    });
                }
            });

            return L.geoJson($scope.worldJson, {
                style: style,
                onEachFeature: onEachFeature
            });

            function resetHighlight(e) {
                $scope.world.resetStyle(e.target);
            }

            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight
                });
            }

            function getColor(d) {
                if (scale) {
                    return  d > 0 ? colors[d] : '#c3c3c3';
                } else {
                    return  d > 0 ? stanceColors[d] : '#c3c3c3';
                }
            }

            function style(feature) {
                var value = feature.properties.value;

                return {
                    fillColor: getColor(value),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: value == 5 ? 1 : .7
                };
            }

            function highlightFeature(e) {
                var layer = e.target;

                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.5
                });

                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            }
        }
    })
;

