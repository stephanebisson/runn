runn.controller('ScheduleController',
['$scope', 'schedule', function($scope, schedule) {
    $scope.schedule = schedule.query();
}]);