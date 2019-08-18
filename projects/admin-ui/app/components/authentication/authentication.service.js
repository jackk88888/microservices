'use strict';
/**
 * Authentication Service
 */
angular.module('authentication.service', ['context.factory'])
    .service('AuthenticationService', ['ContextFactory', '$http', function (ContextFactory, $http) {

        var SERVER_PATH = ContextFactory.getServerUrl();

        return {
            authentication: function (credentials) {
                return $http({
                    method: 'POST',
                    url: SERVER_PATH + '/api/oauth/token',
                    data: {username: credentials.username, password: credentials.password}
                });
            },
            getSelf: function () {
                var url = SERVER_PATH + '/api/get-self';
                return $http.get(url);
            }
        };
    }]);
