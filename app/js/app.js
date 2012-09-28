var runn = angular.module('app', 
    ['ngResource', 'ngCookies', 'ngCouch', 'otherStuff', 'runn'])
    .config(function($routeProvider){
        $routeProvider
            .when('/login', {
                templateUrl: 'html/login.html'
            })
            .when('/mytraining', {
                templateUrl: 'html/mytraining.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });