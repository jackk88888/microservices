angular.module('authentication.factory', [])
    .factory('AuthenticationFactory', AuthenticationFactory);

    AuthenticationFactory.$inject = ['$localStorage', '$sessionStorage'];

    function AuthenticationFactory ($localStorage, $sessionStorage) {
        var service = {
            getToken: getToken,
            storeAuthenticationToken: storeAuthenticationToken,
            storeCredentials: storeCredentials,
            getCredentials: getCredentials,
            setUserSettings: setUserSettings,
            getUserSettings: getUserSettings,
            logout: logout
        };
        return service;

        function getToken () {
            return $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        }

        function storeAuthenticationToken(token, rememberMe) {
            if(rememberMe){
                $localStorage.authenticationToken = token;
            } else {
                $sessionStorage.authenticationToken = token;
            }
        }

        function storeCredentials (credentials) {
            $sessionStorage.credentials = credentials;
        }

        function getCredentials () {
            return $sessionStorage.credentials;
        }

        function setUserSettings (userSettings) {
            return $sessionStorage.userSettings = userSettings;
        }

        function getUserSettings () {
            return $sessionStorage.userSettings;
        }

        function logout () {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
            delete $sessionStorage.credentials;
        }
    }
