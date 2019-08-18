'use strict';

angular.module('app').config(compileServiceConfig);

    compileServiceConfig.$inject = ['$compileProvider','DEBUG_INFO_ENABLED'];

    function compileServiceConfig($compileProvider,DEBUG_INFO_ENABLED) {
        $compileProvider.debugInfoEnabled(DEBUG_INFO_ENABLED);
    }

