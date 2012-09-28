var runn = angular.module('runn', ['ngResource', 'ngCouch', 'otherStuff'])
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