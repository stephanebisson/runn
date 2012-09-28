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
            },
            signup: function(username, password){
                
            }
        };
    }])
    .factory('couchResource', ['$http', function($http){
        var docExtension = {
            update: function(){
                throw 'not implemented';
            },
            del: function(){
                throw 'not implemented';
            }
        };
        var listExtension = {
            add: function(doc){
                var self = this;
                var p = $http({
                    method: 'post',
                    url: '/accomplishments',
                    data: doc
                });
                p.success(function(d){
                    self.push(angular.extend(doc, d));
                });
            }
        };
        var transformer = function(data){
            data = angular.fromJson(data);
            var docs = data.rows.map(function(r){
                return angular.extend(r.doc, docExtension);
            });
            return angular.extend(docs, listExtension);
        };
        return function(name){
            return {
                query: function(){
                    return $http({
                        method: 'get',
                        url: '/' + name + '/_all_docs?include_docs=true',
                        transformResponse: transformer
                    });
                },
                get: function(){
                    throw 'not implemented';
                }
            };
        };
    }]);