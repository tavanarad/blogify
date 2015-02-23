(function(){
    'use strict';

    angular
        .module('blogify.config')
        .config(config);

    config.$inject = ['$locationProvider', '$interpolateProvider',
                        '$httpProvider'];

    function config($locationProvider, $interpolateProvider,
        $httpProvider){
        //remove # from url
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        //change angularjs symbol to {[{}]}
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');

    }
})();
