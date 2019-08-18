'use strict';
//Authentication Controller
angular.module('authentication.controller', ['authentication.service', 'authentication.factory'])
    .controller('AuthenticationController', ['$scope', '$state', 'AuthenticationService', 'AuthenticationFactory',
        function ($scope, $state, AuthenticationService, AuthenticationFactory) {

            $scope.authentication = function () {
                AuthenticationService.authentication($scope.credentials).success(authenticateSuccess);
            };

            function authenticateSuccess(data, status, headers) {
                var token = headers('Authorization');
                if (token != null && angular.isDefined(token)) {
                    token = token.slice(10, token.length);
                    AuthenticationFactory.storeAuthenticationToken(token, true);
                    AuthenticationService.getSelf().then(function (response) {
                        AuthenticationFactory.storeCredentials(response.data);
                        $state.go("app.dashboard");
                    });
                }
            }
        }]);
