'use strict';
/**
 * Permission  Service
 */
var app = angular.module('permission.service', ['context.factory']);

app.service('PermissionService', ['ContextFactory', '$http', function (ContextFactory, $http) {
    var SERVER_PATH = ContextFactory.getServerUrl();
    var PERM_PATH = "/permission";
    return {
        list: function () {
            var url = SERVER_PATH + PERM_PATH + '/list';
            return $http.get(url);
        }
    }
}]);
