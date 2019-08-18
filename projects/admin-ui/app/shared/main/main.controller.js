'use strict';
//Main Controller

angular.module('app').controller('MainController', ['$scope', '$rootScope', '$state', '$window', '$localStorage', '$translate', '$cookies','$http', '$sessionStorage',
    function ($scope, $rootScope, $state, $window, $localStorage, $translate, $cookies,$http, $sessionStorage) {

        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        if (isIE) {
            angular.element($window.document.body).addClass('ie');
        }
        if (isSmartDevice($window)) {
            angular.element($window.document.body).addClass('smart');
        }

        $rootScope.credentials = $sessionStorage.credentials;

        // config
        $scope.app = {
            name: 'Admin',
            version: '1.0',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // for box layout, add background image
            $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        // angular translate
        $scope.lang = {
            isopen: false
        };
        $scope.langs = {
            en: 'English',
            tr: 'Turkce'
        };
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $scope.setLang = function (langKey, $event) {
            // set the current lang
            $scope.selectLang = $scope.langs[langKey];
            // You can change the language during runtime
            $translate.use(langKey);
            $scope.lang.isopen = !$scope.lang.isopen;
        };

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        var SERVER_PATH;
        var context = $("meta[name='context']").attr("content");
        if (context !== undefined && context !== null) {
            SERVER_PATH = window.location.origin + context;
        } else {
            SERVER_PATH = window.location.origin;
        }

        $scope.logout = function(){

            var url = SERVER_PATH  + '/logout';
            return $http.get(url).then(function (response) {
                window.location.reload();
            });
        };
        var stompClient = null;

        $scope.reconnect = function() {
            setTimeout($scope.initSockets, 10000);
        };

        $scope.initSockets = function() {
            stompClient = Stomp.client('ws://localhost:8081/hello');
            stompClient.debug = null;
            stompClient.connect({}, function(frame) {
                stompClient.subscribe('/topic/greetings', function(greeting){
                    showGreeting(JSON.parse(greeting.body).content);
                });
            });
            $scope.socket.client = new SockJS('/spring-live-updates/notify');
            $scope.socket.stomp = Stomp.over($scope.socket.client);
            $scope.socket.stomp.connect({}, function() {
                $scope.socket.stomp.subscribe("/topic/notify", $scope.notify);
            });
            $scope.socket.client.onclose = $scope.reconnect;
        };

    }]);
