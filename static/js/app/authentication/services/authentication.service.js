(function(){
    'use strict';

    angular
        .module('blogify.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$http', '$cookies', 'notify'];

    /*
     * @name Authentication
     * @memberOf blogify.authentication.services
     */
    function Authentication($http, $cookies, notify){
        
        var baseUrl = '/api/auth/';

        var Authentication = {
            setAuthenticatedUser: setAuthenticatedUser,
            getAuthenticatedUser: getAuthenticatedUser,
            isAuthenticated: isAuthenticated,
            unAuthenticate: unAuthenticate,
            register: register,
            login: login,
            logout: logout
        };


        /*
         * @name setAuthenticatedUser
         * @desc Write authenticated user info to cookie
         * @param {object} user The authenticated user info
         * @memberOf blogify.authentication.services.Authentication
         */
        function setAuthenticatedUser(user){
            $cookies.authenticatedUser = JSON.stringify(user);
        }

        /*
         * @name getAuthenticatedUser
         * @desc Read authenticated user info from cookie
         * @return {object} user The authenticated user info
         * @memberOf blogify.authentication.services.Authentication
         */
        function getAuthenticatedUser(){
            if(!$cookies.authenticatedUser)
                return;

            return JSON.parse($cookies.authenticatedUser);
        }

        /*
         * @name isAuthenticated
         * @desc Checks cookie to find authenticated user info
         * @return {Boolean} Returns False if there is not any user info in 
         * cookie else returns True
         * @memberOf blogify.authentication.services.Authentication
         */
        function isAuthenticated(){
            return !! $cookies.authenticatedUser
        }

        /*
         * @name unAuthenticate
         * @desc Remove user info from cookie
         * @memberOf blogify.authentication.services.Authentication
         */
        function unAuthenticate(){
            if($cookies.authenticatedUser){
                delete $cookies.authenticatedUser;
            }
        }

        /*
         * @name register
         * @desc Try to register a new user
         * @param {object} user A new user info
         * @return {Promise}
         * @memberOf blogify.authentication.services.Authentication
         */
        function register(user){
            return $http
                .post(baseUrl + 'user/', user);
        }

        /*
         * @name login
         * @desc Try to login the user
         * @param {object} user User info
         * @return {Promise}
         * @memberOf blogify.authentication.services.Authentication
         */
        function login(user){
            $http
                .post(baseUrl + 'login/', user)
                .then(success, fail);

            function success(data, status, headers, configs){
                setAuthenticatedUser(data.data);
                
                window.location = '/';
            }

            function fail(data, status, headers, configs){
                notify({
                    message: data.data['status'] + ": " + data.data['message'],
                    classes: 'alert-danger'
                });
            }
        }

        /*
         * @name logout
         * @desc Try to logout the logged in user
         * memberOf blogify.authentication.services.Authentication
         */
        function logout(){
            $http
                .get(baseUrl + 'logout/')
                .then(success, fail);

            function success(data, status, headers, configs){
                unAuthenticate();

                window.location = '/';
            }

            function fail(data, status, headers, configs){
                notify({
                    message: data.data,
                    classes: 'alert-danger'
                });

                window.location = '/';
            }
        }

        return Authentication;
    }
})();
