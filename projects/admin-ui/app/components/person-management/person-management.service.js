'use strict';
/**
 * Person  Service
 */
var app = angular.module('person.service', ['context.factory']);

app.service('PersonService', ['ContextFactory', '$http', function (ContextFactory, $http) {
    var SERVER_PATH = ContextFactory.getServerUrl();
    var PERSON_PATH = "/person";
    return {
        list: function (searchObject) {
            var url = SERVER_PATH + PERSON_PATH + '/list';
            return $http.post(url, searchObject);
        },
        create: function (person) {
            var url = SERVER_PATH + PERSON_PATH + '/create';
            return $http.post(url, person);
        },
        get: function (id) {
            var url = SERVER_PATH + PERSON_PATH + '/get/' + id;
            return $http.get(url);
        },
        update: function (id, person) {
            var url = SERVER_PATH + PERSON_PATH + '/update/' + id;
            return $http.put(url, person);
        },
        delete: function (id) {
            var url = SERVER_PATH + PERSON_PATH + '/delete/' + id;
            return $http.delete(url);
        }
    }
}]);
