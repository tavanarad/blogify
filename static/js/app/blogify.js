(function(){
    'use strict';

    angular
        .module('blogify', [
            'blogify.config',
            'blogify.routers',
            'cgNotify',
            'blogify.home',
            'blogify.authentication'
            ]);

    angular
        .module('blogify.config', []);

    angular
        .module('blogify.routers', ['ui.router']);

    angular
        .module('blogify')
        .run(run);

    run.$inject = ['$http', '$rootScope', 'notify'];

    function run($http, $rootScope, notify)
    {
        // Set Django CSRF tokens to each http request header
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        

        // set defaul template url of angular-notify
        notify.config({
            templateUrl: '/static/templates/notify/notify-template.html'
        });

        // Add notify template to cache
        $http.get('/static/templates/notify/notify-template.html');

    }
    
})();
