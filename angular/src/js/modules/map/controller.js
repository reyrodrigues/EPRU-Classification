/**
 * Created by reyrodrigues on 12/25/15.
 */
angular
    .module('app')
    .controller('MapController', function MapController($scope, $http, leafletData, OAuth, Scorecard, $q) {
        $scope.defaults = {
            tileLayer: '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            path: {
            },
            legend: {
                position: 'topright',
                colors: [ '#ff0000', '#28c9ff', '#0000ff', '#ecf386' ],
                labels: [ 'National Cycle Route', 'Regional Cycle Route', 'Local Cycle Network', 'Cycleway' ]
            }
        };

        $scope.center = {
            lat: 0.0,
            lng: 0.0,
            zoom: 3
        };
        var countryMap = isoCountriesCodes.reduce(function (obj, b) {
            obj[b[0]] = b[1];
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
                });
            });

        });

        function getLayer(data, scale) {
            angular.forEach(data, function (d) {
                var countryISO3 = countryMap[d.worksheet.emergency_country];
                var country = $scope.worldJson.features.filter(function (a) {
                    return a.id == countryISO3
                });

                if (country && country[0]) {
                    country[0].properties.value = scale ? d.emergency_classification_rank : d.taken_stance;
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
                return  d == 5 ? '#800026' :
                        d == 4 ? '#800026' :
                        d == 3 ? '#E31A1C' :
                        d == 2 ? '#FD8D3C' :
                        d == 1 ? '#e3e3e3' :
                    '#c3c3c3';
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

