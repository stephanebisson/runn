angular.module('runn', [])
    .factory('currentUser', ['$cookies', function($cookies){
        var key = 'CURRENT_USER';
        var f = function(user){
            if (user) {
                $cookies[key] = user;
            }
            return $cookies[key];
        };
        f.clear = function(){
            delete $cookies[key];
        }; 
        return f;
    }])
    .controller('CurrentUserController', 
        ['$scope', 'auth', '$location', 'currentUser', 
        function($scope, auth, $location, currentUser){
            var goBackToLoginPage = function(){
                $location.path('/login');
                currentUser.clear();
            };
            $scope.logout = function(){
                auth.logout().then(goBackToLoginPage, goBackToLoginPage);
            };
            $scope.isLoggedIn = function(){
                return !!currentUser();
            };
        }]
    )
    .controller('LoginController', 
        ['$scope', '$location', 'auth', 'currentUser', 
        function($scope, $location, auth, currentUser){
            $scope.login = function(){
                auth.login($scope.username, $scope.password)
                    .success(function(){
                        $location.path('/mytraining');
                        currentUser($scope.username);
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