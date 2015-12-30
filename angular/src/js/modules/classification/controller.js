/**
 * Created by reyrodrigues on 12/27/15.
 */

angular
    .module('app')
    .controller('ListWorksheetController', function ($scope, Worksheet, $mdDialog) {
        $scope.gridOptions = {
            paginationPageSizes: [5, 25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            customOptions: {limit: 25, offset: 0},

            columnDefs: [
                { 'name': 'id' },
                { 'name': 'title'},
                { 'name': 'emergency_country'},
                { 'name': 'origin_country'},
                { 'name': 'start', type: 'date'},
                {
                    'name': 'actions',
                    cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">' +
                        '<a class="btn btn-primary btn-xs" ui-sref="^.edit({id:row.entity.id})">Edit</a>&nbsp;' +
                        '<button class="btn btn-danger btn-xs" ng-click="grid.appScope.deleteWorksheet($event, row.entity.id)">Delete</button>' +
                        '</div>',
                    enableSorting: false,
                    enableHiding: false
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    var sort = sortColumns.map(function (s) {
                        return (s.sort.direction == "desc" ? "-" : "") + s.name;
                    }).join(", ");

                    $scope.gridOptions.customOptions.sort = sort;
                    getPage();

                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    var limit = pageSize * (newPage);
                    var offset = pageSize * (newPage - 1);
                    $scope.gridOptions.customOptions.limit = limit;
                    $scope.gridOptions.customOptions.offset = offset;

                    getPage();

                });
            }
        };

        $scope.deleteWorksheet = function (ev, id) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm')
                .textContent('Are you sure you would like to delete this record? This operation can\'t be reversed')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('no');
            $mdDialog.show(confirm).then(function () {
                Worksheet.delete({id: id}, getPage);
            }, function () {
            });
        };

        getPage();
        function getPage() {

            var limit = $scope.gridOptions.customOptions.limit;
            var offset = $scope.gridOptions.customOptions.offset;
            var sort = $scope.gridOptions.customOptions.sort;
            Worksheet.query({limit: limit, offset: offset, ordering: sort })
                .$promise
                .then(function (worksheets) {
                    $scope.gridOptions.totalItems = worksheets.count;

                    $scope.gridOptions.data = worksheets.results;
                    console.log(worksheets.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
    })
    .controller('EditWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window) {
        $scope.worksheet = Worksheet.get($state.params);
        $scope.metadata = Worksheet.metadata();

        $scope.countries = Object.keys(countryList).map(function (k) {
            return {
                id: k,
                name: countryList[k]
            }
        }).sort(function (a, b) {
            return a.name > b.name ? 1 : (a.name == b.name ? 0 : -1);
        });


        $scope.save = function () {
            $scope.worksheet.start = moment($scope.worksheet.start).toJSON().split('T')[0];

            $scope.worksheet.$save().then(function () {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Record Saved!')
                        .position('Top right')
                        .hideDelay(3000)
                );
            }).catch(function () {
                console.log('fail', arguments);
            });
        };
    })
    .controller('CreateWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window) {
        $scope.worksheet = new Worksheet({
            number_deaths: 0,
            number_injuries: 0,
            number_affected: 0,
            number_displaced: 0
        });
        $scope.metadata = Worksheet.metadata();

        $scope.countries = Object.keys(countryList).map(function (k) {
            return {
                id: k,
                name: countryList[k]
            }
        }).sort(function (a, b) {
            return a.name > b.name ? 1 : (a.name == b.name ? 0 : -1);
        });


        $scope.save = function () {
            var worksheet = $scope.worksheet.toJSON();
            worksheet.start = moment($scope.worksheet.start).toJSON().split('T')[0];

            var promise = Worksheet.create(worksheet).$promise;

            promise
                .then(function (worksheet) {
                    $state.go('^.^.scorecards.edit', {id: worksheet.scorecard.id });
                }).catch(function () {
                    console.log('fail', arguments);
                });
        };
    })


    .controller('ListScorecardController', function ($scope, Scorecard, $mdDialog) {
        $scope.gridOptions = {
            paginationPageSizes: [5, 25, 50, 75],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            customOptions: {limit: 25, offset: 0},
            columnDefs: [
                { 'name': 'id' },
                { 'name': 'worksheet.title', enableSorting: false},
                { 'name': 'worksheet.emergency_country', enableSorting: false},
                { 'name': 'worksheet.origin_country', enableSorting: false},
                { 'name': 'worksheet.start', type: 'date', enableSorting: false},
                {
                    'name': 'actions',
                    cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">' +
                        '<a class="btn btn-primary btn-xs" ui-sref="^.edit({id:row.entity.id})">Open</a>&nbsp;' +
                        '</div>',
                    enableSorting: false,
                    enableHiding: false
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    var sort = sortColumns.map(function (s) {
                        return (s.sort.direction == "desc" ? "-" : "") + s.name;
                    }).join(", ");

                    $scope.gridOptions.customOptions.sort = sort;
                    getPage();

                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    var limit = pageSize * (newPage);
                    var offset = pageSize * (newPage - 1);
                    $scope.gridOptions.customOptions.limit = limit;
                    $scope.gridOptions.customOptions.offset = offset;

                    getPage();

                });
            }
        };

        $scope.removeItem = function (ev, id) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Confirm')
                .textContent('Are you sure you would like to delete this record? This operation can\'t be reversed')
                .targetEvent(ev)
                .ok('Yes')
                .cancel('no');
            $mdDialog.show(confirm).then(function () {
                Scorecard.delete({id: id}, getPage);
            }, function () {
            });
        };

        getPage();
        function getPage() {

            var limit = $scope.gridOptions.customOptions.limit;
            var offset = $scope.gridOptions.customOptions.offset;
            var sort = $scope.gridOptions.customOptions.sort;
            Scorecard.query({limit: limit, offset: offset, ordering: sort })
                .$promise
                .then(function (result) {
                    $scope.gridOptions.totalItems = result.count;

                    $scope.gridOptions.data = result.results;
                    console.log(result.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
    })
    .controller('EditScorecardController', function ($scope, $state, $http, Worksheet, Scorecard, $mdToast, $window, $q) {
        $scope.scorecard = Scorecard.get($state.params);
        $scope.scorecard.$promise.then(function (scorecard) {
            $scope.worksheet = scorecard.worksheet;
        });
        $q.all([Worksheet.metadata().$promise, Scorecard.metadata().$promise]).then(function (promises) {
            $scope.metadata = angular.extend(promises[0].toJSON(), promises[1].toJSON());

            console.log($scope.metadata);
        });

        $scope.countries = Object.keys(countryList).map(function (k) {
            return {
                id: k,
                name: countryList[k]
            }
        }).sort(function (a, b) {
            return a.name > b.name ? 1 : (a.name == b.name ? 0 : -1);
        });

        $scope.save = function () {
            $scope.scorecard.$save()
                .then(function () {
                    $window.scrollTo(0, 0);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Record Saved!')
                            .position('Top right')
                            .hideDelay(3000)
                    );
                }).catch(function () {
                    console.log('fail', arguments);
                });
        };
    })

;
