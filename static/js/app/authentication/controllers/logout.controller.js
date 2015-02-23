(function(){
    'use strict';

    angular
        .module('blogify.authentication.controllers')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['Authentication', '$state', 'notify'];

    /*
     * @name HomeController
     * @memberOf blogify.authentication.controllers
     */
    function LogoutController(Authentication, $state, notify){
        Authentication.logout();

    }
})();
