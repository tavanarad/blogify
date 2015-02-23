(function(){
    'use strict';

    angular
        .module('blogify.routers')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider){
        
        // For any unmathced url, redirect to /
        $urlRouterProvider.otherwise('/dashboard');


        var login = {
            name: 'login',
            url: '/login',
            templateUrl: '/static/templates/authentication/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        };

        var logout = {
            name: 'logout',
            url: '/logout',
            controller: 'LogoutController',
            controllerAs: 'vm'
        };

        var register = {
            name: 'register',
            url: '/register',
            templateUrl: '/static/templates/authentication/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        };

        var profile = {
            name: 'dashboard.profile',
            url: '/profile',
            views:{
                'content@dashboard':{
                    templateUrl: '/static/templates/authentication/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                }
            }
        };

        var dashboard = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: '/home/',
            controller: 'HomeController',
            controllerAs: 'vm'
        };


        $stateProvider
            .state(login)
            .state(logout)
            .state(register)
            .state(profile)
            .state(dashboard);
    }
})();
