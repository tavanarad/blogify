(function(){
    'use strict';

    angular
        .module('blogify.authentication.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['Authentication', 'Profile', '$state', 'notify'];

    /*
     * @name ProfileController
     * @memberOf blogify.authentication.controllers
     */
    function ProfileController(Authentication, Profile, $state, notify){
        var vm = this;
        vm.update = update;

        checkAuthentication();
        getProfile();

        /*
         * @name checkAuthentication
         * @memberOf blogify.authentication.controllers.ProfileController
         */
        function checkAuthentication(){
            if(!Authentication.isAuthenticated())
                $state.go('login');
        }

        /*
         * @name getProfile
         * @memberOf blogify.authentication.controllers.ProfileController
         */
        function getProfile(){
            var user = Authentication.getAuthenticatedUser();

            Profile
                .get(user.username)
                .then(success, fail);

            function success(data, status, headers, configs){
                vm.user = data.data;
            }

            function fail(data, status, headers, configs){
                notify({
                    message: data.data,
                    classes: 'alert-warning'
                });
                $state.go('dashboard');
            }
        }

        /*
         * @name update
         * @memberOf blogify.authentication.controllers.ProfileController
         */
        function update(){
            Profile
                .update(vm.user)
                .then(success, fail);

            function success(data, status, headers, configs){
                Authentication.setAuthenticatedUser(data.data);

                notify({
                    message: 'Your profile changed successfully',
                    classes: 'alert-success'
                });

                $state.go('dashboard');
            }

            function fail(data, status, headers, configs){
                notify({
                    message: data.data,
                    classes: 'alert-danger'
                });
            }
        }
    }
})();
