runn.controller('ScheduleController', 
    ['$scope', 'schedule', 
    function($scope, schedule){
        schedule.query(function(data){
            $scope.schedule = data[0];
        });
    }]
);