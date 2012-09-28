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
            $scope.getUsername = function(){
                return currentUser();
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
    .controller('SignupController', 
        ['$scope', 
        function($scope){
            
    }])
    .controller('TrainingController', 
    ['$scope', 'trainings', 'accomplishments', 
    function($scope, trainings, accomplishments){
        trainings.query().success(function(data){
            $scope.title = data[0].name;
            $scope.workouts = data[0].workouts;
        });
        accomplishments.query().success(function(a){
            $scope.accomplishments = a;
        });
        $scope.accomplish = function(id, workout){
            $scope.workoutIndex = id;
            $scope.workoutDesc = workout;
            $scope.workoutDate = new Date();
            $scope.showConfirmForm = true;
        };
        $scope.confirm = function(){
            $scope.accomplishments.add({
                index: $scope.currentWorkout,
                workout: $scope.workoutDesc, 
                date: $scope.workoutDate
            });
            $scope.showConfirmForm = false
        };
        $scope.cancel = function(){
            $scope.showConfirmForm = false;
        };
    }])
    .factory('trainings', ['couchResource', function (couchResource) {
        return couchResource('trainings');
    }])
    .factory('accomplishments', ['couchResource', function(couchResource){
        return couchResource('accomplishments');
        
    }])
    .factory('scheduler', function(){
        var oneDay = 24*60*60*1000;
        return {
            calendar: function(program, startDate){
                startDate = Date.parse(startDate) - oneDay;
                
                var nextDay = function(){
                    return new Date(startDate += oneDay);
                };
                
                var workoutToDay = function(w){
                    return {
                        workout: w,
                        date: nextDay()
                    };
                };
                
                return {
                    days: program.workouts.map(workoutToDay)
                };
            },
            getNextWorkout: function(){
                return 'tbd';
            }
        };
    });