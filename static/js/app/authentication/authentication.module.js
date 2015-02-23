(function(){
    'use strict';

    angular
        .module('blogify.authentication', [
            'blogify.authentication.controllers',
            'blogify.authentication.services',
            ]);

    angular
        .module('blogify.authentication.controllers', []);

    angular
        .module('blogify.authentication.services', ['ngCookies']);

})();
