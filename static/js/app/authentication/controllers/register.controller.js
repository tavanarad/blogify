(function(){
    'use strict';

    angular
        .module('blogify.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['Authentication', '$state', 'notify'];

    /*
     * @name RegisterController
     * memberOf blogify.authentication.controllers
     */
    function RegisterController(Authentication, $state, notify){
        var vm = this;

        vm.register = register;

        /*
         * @name register
         * @desc Use Authentication.register to register new user
         * @memberOf blogify.authentication.controllers.RegisterController
         */
        function register(){
            Authentication
                .register(vm.user)
                .then(success, fail);

            function success(data, status, headers, configs){
                notify({
                    message: "You're registered successfully.",
                    classes: 'alert-success'
                });

                $state.go('login');
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
