var runn = angular.module('runn', ['ngResource'])
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