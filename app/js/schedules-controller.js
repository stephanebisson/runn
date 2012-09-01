function SchedulesController($scope, schedule) {
    $scope.schedules = schedule.query();
}