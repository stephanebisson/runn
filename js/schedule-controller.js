runn.controller('ScheduleController',
['$scope', 'schedule', function($scope, schedule) {
    $scope.schedule = schedule.query();
    $scope.click = function(){
        $scope.popup = true;
    };
}]);