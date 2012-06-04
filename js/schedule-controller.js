runn.controller('ScheduleController',
['$scope', 'schedule', function($scope, schedule) {
    $scope.schedule = schedule.query();
    $scope.click = function(day){
        if (day.activity !== 'run') return;
        
        $.UIShowPopUp({
            id: 'dayPopup',
            title: 'Done!', 
            message: 'Did you run ' + day.desc + ' successfully?', 
            cancelUIButton: 'I tried but...', 
            continueUIButton: 'Hell yeah!', 
            callback: function() {
                // stuff here
                day.success = true;
                $scope.$apply();
            }
        });
    };
}]);