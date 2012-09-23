runn.factory('schedule', ['$http', '$resource', function ($http, $resource) {

    window.rrr = $resource;
    window.hhh = $http;
    return $resource('/runn/:id', null, 
        {
            query: {
                method: 'GET', 
                isArray:true, 
                params: {'id': '_all_docs', 'include_docs': true}}, 
            }
    );
    /*return {
        query: function () {
            var data = [];
            $http({
                method: 'get', 
                url: '/runn/_all_docs?include_docs=true',
                transformResponse: function(r){ 
                    var result = [];
                    angular.forEach(angular.fromJson(r).rows, function(a){
                        result.push(a.doc);
                    });
                    return result; 
                }
            }).success(function(d){
                angular.forEach(d, function(d){
                    data.push(d);
                });
            });
            return data;
        },
        get: function (name) {
            return {};
        }
    };*/
}]);