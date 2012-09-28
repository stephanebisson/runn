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
        var addDocFn = function(name){
            return function(doc){
                return $http({
                    method: 'post',
                    url: '/' + name,
                    data: doc
                });
            };
        };
        var listExtensionFn = function(name){
            return {
                add: function(doc){
                    var self = this;
                    var p = addDocFn(name)(doc);
                    p.success(function(d){
                        self.push(angular.extend(doc, d));
                    });
                    return p;
                }
            };
        };
        var transformerFn = function(name){
            return function(data){
                data = angular.fromJson(data);
                var docs = data.rows.map(function(r){
                    return angular.extend(r.doc, docExtension);
                });
                return angular.extend(docs, listExtensionFn(name));
            };
        };
        return function(name){
            return {
                query: function(){
                    return $http({
                        method: 'get',
                        url: '/' + name + '/_all_docs?include_docs=true',
                        transformResponse: transformerFn(name)
                    });
                },
                get: function(){
                    throw 'not implemented';
                }
            };
        };
    }]);