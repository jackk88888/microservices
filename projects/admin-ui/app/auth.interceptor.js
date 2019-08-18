'use strict';

angular.module('app')
    .factory('authenticateInterceptor', authenticateInterceptor);

    authenticateInterceptor.$inject = ['$localStorage', '$sessionStorage'];

    function authenticateInterceptor ($localStorage, $sessionStorage) {
        var service = {
            request: request
        };
        return service;

        function request (config) {
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        }
    }
