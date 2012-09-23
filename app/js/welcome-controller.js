runn.controller('WelcomeController', 
    ['$scope', '$location', 'auth', 
    function($scope, $location, auth){
        $scope.login = function(){
            auth.login($scope.username, $scope.password)
                .success(function(){
                    $location.path('/mytraining');
                });
        };
    }
]);