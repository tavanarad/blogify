(function(){
    'use strict';

    angular
        .module('blogify.home.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Authentication', '$state'];

    /*
     * @name HomeController
     * @memberOf blogify.home.controllers
     */
    function HomeController(Authentication, $state){
        var vm = this;
        vm.user = Authentication.getAuthenticatedUser();

        checkAuthentication();

        /*
         * @name checkAuthentication
         * @desc Use Authentication.isAuthenticated to check that user is loged in or not
         * memberOf blogify.home.controllers.HomeController
         */
        function checkAuthentication(){
            if(!Authentication.isAuthenticated())
                $state.go('login');
        }


    }
})();
