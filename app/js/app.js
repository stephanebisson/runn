var runn = angular.module('runn', ['ngResource'])
    .config(function($routeProvider){
        $routeProvider
            .when('/mytraining', {
                templateUrl: 'html/mytraining.html'
            })
            .otherwise({
                templateUrl: 'html/welcome.html'
            });
    });