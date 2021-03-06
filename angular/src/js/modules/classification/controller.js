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

                    $scope.gridOptions.data = worksheets.results.map(function(r){
                        r.emergency_country = countryList[r.emergency_country];
                        r.origin_country = countryList[r.origin_country];
                        r.start = moment(r.start).format('L');

                        return r;
                    });
                    console.log(worksheets.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
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
                { 'field': 'worksheet.title', name: 'Emergency Name', enableSorting: false},
                { 'field': 'worksheet.emergency_country', name: 'Emergency Country', enableSorting: false},
                { 'field': 'worksheet.origin_country', name: 'Country of Origin', enableSorting: false},
                { 'field': 'worksheet.start', name: 'Start of Crisis', type: 'date', enableSorting: false},
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

                    $scope.gridOptions.data = result.results.map(function(r){
                        r.worksheet.emergency_country = countryList[r.worksheet.emergency_country];
                        r.worksheet.origin_country = countryList[r.worksheet.origin_country];
                        r.worksheet.start = moment(r.worksheet.start).format('L');

                        return r;
                    });
                    console.log(result.count, $scope.gridOptions.totalItems, $scope.gridOptions);
                });
        }
    })

    .controller('EditWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window, $parse) {
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

            var worksheet = $scope.worksheet.toJSON();
            worksheet.start = moment($scope.worksheet.start).toJSON().split('T')[0];

            var promise = Worksheet.save(worksheet).$promise;

            promise
                .then(function (worksheet) {
                    $window.scrollTo(0, 0);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Record Saved!')
                            .position('Top right')
                            .hideDelay(3000)
                    );
                    $scope.worksheet = worksheet;
                }).catch(function (resp) {
                    var serverResponse = resp.data;

                    for (var fieldName in serverResponse) {
                        var message = serverResponse[fieldName];
                        var serverMessage = $parse('form.' + fieldName + '.$error.serverMessage');

                        $scope.form.$setValidity(fieldName, false, $scope.form);
                        serverMessage.assign($scope, serverResponse[fieldName]);
                    }
                });
        };
    })
    .controller('CreateWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window, $parse) {
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
                }).catch(function (resp) {
                    $window.scrollTo(0, 0);

                    var serverResponse = resp.data;

                    for (var fieldName in serverResponse) {
                        var message = serverResponse[fieldName].join('\n');
                        var serverMessage = $parse('form.' + fieldName + '.$error.serverMessage');


                        $scope.form.$setValidity(fieldName, false, $scope.form);
                        serverMessage.assign($scope, message);
                    }
                });
        };
    })
    .controller('EditScorecardController', function ($scope, $state, $http, Worksheet, Scorecard, $parse, $timeout, $mdToast, $window, $q, $mdDialog) {
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

        $scope.sendNotification = function (ev) {
            $window.scrollTo(0, 0);

            var confirm = $mdDialog.confirm()
                .targetEvent(ev)
                .title('Notify Reviewers')
                .textContent('This will notify all of the reviewers in the system. Are you sure you would like to continue?')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                $timeout(function () {
                    $mdToast.simple()
                        .textContent('Notification Sent!')
                        .position('Top right')

                        .hideDelay(3000);
                }, 2000);
            }, function () {
            });
        };

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
                }).catch(function (resp) {
                    var serverResponse = resp.data;

                    for (var fieldName in serverResponse) {
                        var message = serverResponse[fieldName].join('\n');
                        var serverMessage = $parse('form.' + fieldName + '.$error.serverMessage');


                        $scope.form.$setValidity(fieldName, false, $scope.form);
                        serverMessage.assign($scope, message);
                    }
                });
        };
    })

;
