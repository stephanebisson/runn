var runn = angular.module('app', 
    ['ngResource', 'ngCookies', 'bootstrap', 'ngCouch', 'otherStuff', 'runn'])
    .config(function($routeProvider){
        $routeProvider
            .when('/login', {
                templateUrl: 'html/welcome.html'
            })
            .when('/mytraining', {
                templateUrl: 'html/mytraining.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });