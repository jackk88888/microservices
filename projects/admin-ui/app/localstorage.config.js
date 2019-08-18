'use strict';

angular.module('app').config(localStorageConfig);

    localStorageConfig.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

    function localStorageConfig($localStorageProvider, $sessionStorageProvider) {
        $localStorageProvider.setKeyPrefix('admin-');
        $sessionStorageProvider.setKeyPrefix('admin-');
    }
