(function(){
    'use strict';

    angular
        .module('blogify.authentication.services')
        .factory('Profile', Profile);

    Profile.$inject = ['$http'];

    /*
     * @name Profile
     * @memberOf blogify.authentication.services
     */
    function Profile($http){
        var baseUrl = '/api/auth/user/';
        var Profile = {
            get: get,
            update: update
        };

        /*
         * @name get
         * @desc Try to get user profile
         * @param {string} username 
         * @return {Promise}
         * memberOf blogify.authentication.services.Profile
         */
        function get(username){
            return $http.get(baseUrl + username +'/');
        }

        /*
         * @name update
         * @desc Try to update user's profile
         * @param {object} user 
         * @return {Promise}
         * @memberOf blogify.authentication.services.Profile
         */
        function update(user){
            return $http.put(baseUrl + user.username + '/', user);
        }

        return Profile;
    }
})();
