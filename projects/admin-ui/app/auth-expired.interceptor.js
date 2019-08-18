'use strict';

angular.module('app').factory('authExpiredInterceptor', authExpiredInterceptor);

    authExpiredInterceptor.$inject = ['$q', '$localStorage', '$sessionStorage'];

    function authExpiredInterceptor($q, $localStorage, $sessionStorage) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError(response) {
            if (response.status === 401) {
                delete $localStorage.authenticationToken;
                delete $sessionStorage.authenticationToken;
                delete $localStorage.principal;
                delete $sessionStorage.principal;

            }
            return $q.reject(response);
        }
    }

