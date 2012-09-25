runn.controller('CurrentUserController', 
    ['$scope', 'auth', '$location', '$rootScope', 
    function($scope, auth, $location, $rootScope){
        var goBackToLoginPage = function(){
            $location.path('/login');
        };
        $scope.logout = function(){
            auth.logout().then(goBackToLoginPage, goBackToLoginPage);
        };
        $scope.isLoggedIn = function(){
            return !!$rootScope.username;
        };
    }]
);