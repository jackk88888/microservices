'use strict';
//Person Controller
var app = angular.module('person.controller', ['person.service','permission.service', 'toaster']);

app.controller('PersonListCtrl', ['$scope', '$state', 'PersonService',
    function ($scope, $state, PersonService) {

        var ctrl = this;

        $scope.isLoading = false;
        $scope.personList = [];
        $scope.itemsByPage = 10;
        $scope.filters = [];
        $scope.filter = {};


        $scope.personCallServer = function getData(tableState) {
            $scope.tableState = tableState;
            $scope.isLoading = true;
            var pagination = tableState.pagination;
            $scope.filter();
            var page = tableState.pagination.start / $scope.itemsByPage || 0;
            PersonService.list({
                "page": page,
                "offset": $scope.itemsByPage,
                "filters": $scope.filters
            }).then(function (response) {
                $scope.isLoading = false;
                tableState.pagination.totalItemCount = response.data.totalElements;
                tableState.pagination.numberOfPages = response.data.totalPages;
                $scope.personList = response.data.content;
            });
        };

        $scope.filter = function () {
            $scope.filters = [];
            if ($scope.filter.status) {
                $scope.filters.push({'argument': 'status', 'operation': 'equals', 'value': $scope.filter.status});
            }
        };

        $scope.makeFilter = function () {
            $scope.tableState.pagination.start = 1;
            $scope.personCallServer($scope.tableState);
        };
        $scope.clearFilter = function () {
            $scope.filter = {};
            $scope.tableState.pagination.start = 1;
            $scope.personCallServer($scope.tableState);
        };

        $scope.edit = function (person) {
            $state.go('app.person-edit', {id: person.id});
        };

    }]);

app.controller('PersonCreateCtrl', ['$scope', '$state', 'PersonService', 'PermissionService', 'toaster',
    function ($scope, $state, PersonService, PermissionService, toaster) {

        $scope.selectedPermissions = [];

        PermissionService.list().then(function (res) {
            $scope.permissionList = res.data;
        });

        $scope.save = function () {
            if (!angular.isUndefined($scope.selectedPermissions)) {
                $scope.person.user.userPermissions = [];
                angular.forEach($scope.selectedPermissions, function(value){
                    $scope.person.user.userPermissions.push({"permission": value});
                });
            }
            PersonService.create($scope.person).then(function (res) {
                toaster.pop('success', 'Başarılı', 'Kişi başarılı şekilde oluşturuldu.');
                $state.go('app.persons');
            });
        };

    }]);

app.controller('PersonEditCtrl', ['$scope', '$state', '$stateParams', 'PersonService', 'toaster',
    function ($scope, $state, $stateParams, PersonService, toaster) {

        $scope.formEdit = true;

        PersonService.get($stateParams.id).then(function (res) {
            $scope.person = res.data;
        });

        $scope.save = function () {
            PersonService.update($stateParams.id, $scope.person).then(function (res) {
                toaster.pop('success', 'Başarılı', 'Kişi başarılı şekilde güncellendi.');
                $state.go('app.persons');
            });
        };

        $scope.delete = function () {
            PersonService.delete($scope.$stateParams.id).then(function (res) {
                toaster.pop('success', 'Başarılı', 'Başarılı şekilde silindi.');
                $state.go('app.persons');
            });
        };

    }]);

app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
