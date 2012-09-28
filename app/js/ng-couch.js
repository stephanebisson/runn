angular.module('ngCouch', [])
    .factory('auth', ['$http', '$rootScope', function($http, $rootScope){
        var url = '/_session', 
            contentType = {'Content-Type': 'application/x-www-form-urlencoded'};
        return {
            login: function(username, password){
                var result = $http.post(url,
                    'name=' + username + '&password=' + password, 
                    {headers:contentType}
                );
                result.success(function(){
                    $rootScope.username = username;
                });
                return result;
            },
            logout: function(){
                delete $rootScope.username;
                return $http['delete'](url);
            }
        };
    }]);