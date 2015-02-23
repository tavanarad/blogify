(function(){
    'use strict';
    
    angular
        .module('blogify.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['Authentication', 'notify'];

    /*
     * @name LoginController
     * @memberOf blogify.authentication.controllers
     */
    function LoginController(Authentication, notify){
        var vm = this;

        vm.login = login;

        /*
         * @name login
         * @desc Try to login
         * @memberOf blogify.authentication.controllers.LoginController
         */
        function login(){
            Authentication.login(vm.user); 
        }
    }
})();
