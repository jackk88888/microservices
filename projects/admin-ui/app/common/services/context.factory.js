'use strict';
/**
 * Context  Service
 */
var app = angular.module('context.factory', []);

app.factory('ContextFactory', function () {

    return {
        getServerUrl: function () {
            return "http://localhost:7300";
        }
    };
});
