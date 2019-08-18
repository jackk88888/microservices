'use strict';

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
        $urlRouterProvider.otherwise('dashboard');

        $stateProvider.state('app', {
            abstract: true,
            templateUrl: '../app/shared/main/main.html'
        })
        .state('authentication', {
            url: '/authentication',
            templateUrl: '../app/components/authentication/authentication.html',
            controller: 'AuthenticationController',
            resolve: load(['authentication'])
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: '../app/components/dashboard/dashboard.html'
        })
        .state('app.persons', {
            url: '/persons',
            controller: 'PersonListCtrl',
            templateUrl: '../app/components/person-management/person-list.html',
            resolve: load(['smart-table', 'toaster', 'person'])
        })
        .state('app.person-create', {
            url: '/person-create',
            controller: 'PersonCreateCtrl',
            templateUrl: '../app/components/person-management/person-details.html',
            resolve: load(['toaster', 'person', 'ui.select'])
        })
        .state('app.person-edit', {
            url: '/person-edit/:id',
            controller: 'PersonEditCtrl',
            templateUrl: '../app/components/person-management/person-details.html',
            resolve: load(['toaster', 'person', 'ui.select'])
        });

    function load(srcs, callback) {
        return {
            deps: ['$ocLazyLoad', '$q',
                function ($ocLazyLoad, $q) {
                    var deferred = $q.defer();
                    var promise = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if (!promise) {
                        promise = deferred.promise;
                    }
                    angular.forEach(srcs, function (src) {
                        promise = promise.then(function () {
                            if (JQ_CONFIG[src]) {
                                return $ocLazyLoad.load(JQ_CONFIG[src]);
                            }
                            angular.forEach(MODULE_CONFIG, function (module) {
                                if (module.name == src) {
                                    name = module.name;
                                } else {
                                    name = src;
                                }
                            });
                            return $ocLazyLoad.load(name);
                        });
                    });
                    deferred.resolve();
                    return callback ? promise.then(function () {
                        return callback();
                    }) : promise;
                }
            ]
        };
    }
}]);
