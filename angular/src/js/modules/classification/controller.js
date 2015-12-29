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
                { 'name': 'start', type:'date'},
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
            $scope.worksheet.$save().then(function () {
                $window.scrollTo(0, 0);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Record Saved!')
                        .position('Top right')
                        .hideDelay(3000)
                );
            }).fail(function () {
                console.log('fail', arguments);
            });
        };
    })
    .controller('CreateWorksheetController', function ($scope, $state, $http, Worksheet, $mdToast, $window) {
        $scope.worksheet = new Worksheet();
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
            $scope.worksheet.$create().then(function () {
                $state.go('^.list');
            }).fail(function () {
                console.log('fail', arguments);
            });
        };
    })

;
