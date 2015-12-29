/**
 * Created by reyrodrigues on 12/25/15.
 */
angular
    .module('app')
    .controller('MapController', function MapController($scope, $http, leafletData, OAuth, Worksheet) {
        $scope.defaults = {
            tileLayer: '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
            path: {
            }
        };

        $scope.center = {
            lat: 0.0,
            lng: 0.0,
            zoom: 3
        };


        leafletData.getMap('map').then(function (map) {
            $http.get('/scale/').then(function (r) {
                var world = L.geoJson(r.data, {
                    style: style,
                    onEachFeature: onEachFeature
                });
                world.addTo(map);

                function getColor(d) {
                    return  d == 5 ? '#800026' :
                            d == 4 ? '#800026' :
                            d == 3 ? '#E31A1C' :
                            d == 2 ? '#FD8D3C' :
                            d == 1 ? '#e3e3e3' :
                        '#c3c3c3';
                }

                function style(feature) {
                    var countryData = feature.properties.countryData;
                    var value = 0;

                    if (countryData) {
                        value = countryData.IRCR;
                    }

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

                function resetHighlight(e) {
                    world.resetStyle(e.target);
                }

                function onEachFeature(feature, layer) {
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight
                    });
                }
            });
        });
    });

