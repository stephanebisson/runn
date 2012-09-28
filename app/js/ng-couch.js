angular.module('ngCouch', [])
    .factory('auth', ['$http', '$rootScope', function($http, $rootScope){
        var url = '/_session', 
            contentType = {'Content-Type': 'application/x-www-form-urlencoded'};
        return {
            login: function(username, password){
                return $http.post(url,
                    'name=' + username + '&password=' + password, 
                    {headers:contentType}
                );
            },
            logout: function(){
                return $http['delete'](url);
            }
        };
    }]);