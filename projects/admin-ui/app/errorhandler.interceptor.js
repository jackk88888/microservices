'use strict';
    angular.module('app').factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope','$location'];

    function errorHandlerInterceptor ($q, $rootScope, $location) {
        var service = {
            responseError: responseError
        };
        return service;

        function responseError (response) {

            return $q.reject(response);
        }
    }
