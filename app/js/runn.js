angular.module('runn', [])
    .controller('CurrentUserController', 
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
    )
    .controller('LoginController', 
        ['$scope', '$location', 'auth', 
        function($scope, $location, auth){
            $scope.login = function(){
                auth.login($scope.username, $scope.password)
                    .success(function(){
                        $location.path('/mytraining');
                    })
                    .error(function(){
                        $scope.error = 'Login failed';
                    });
            };
        }
    ])
    .factory('schedule', ['$http', '$resource', function ($http, $resource) {

        return $resource('/runn/:id', null, 
            {
                query: {
                    method: 'GET', 
                    isArray:true, 
                    params: {'id': '_all_docs', 'include_docs': true}}, 
                }
        );
    }]);