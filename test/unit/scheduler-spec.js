describe('scheduler', function(){
    var scheduler, program, startDate, today;
    
    beforeEach(module('runn'));
    beforeEach(inject(function($injector){
        scheduler = $injector.get('scheduler');
        
        program = {
            name: 'some workout', 
            workouts: [
                "run slow intervals1", "rest1", "runfast intervals1", "rest1", "short run1", "long run1", "rest1",
                "run slow intervals2", "rest2", "runfast intervals2", "rest2", "short run2", "long run2", "rest2"
            ]
        };
        startDate = '01/10/2001';
        today = '01/14/2001';
    }));
    
    
    it('should anchor a training in time', function(){
        // when
        var cal = scheduler.calendar(program, startDate);
        
        // then
        expect(cal.days.length).toBe(14);
        
        expect(cal.days[0].date).toEqual(d('01/10/2001'));
        expect(cal.days[0].workout).toEqual('run slow intervals1');
        
        expect(cal.days[6].date).toEqual(d('01/16/2001'));
        expect(cal.days[13].date).toEqual(d('01/23/2001'));
        expect(cal.days[13].workout).toEqual('rest2');
    });
    
    it('should return the next workout', function(){
        /*
        * show planned start date
        * continuity is the key.
        * a workout tried is yellow
        * a workout not even tried is red
        * a week failed once has to be restarted
        * a week failed twice you go back one week
        * no training in a week you go back one week
        */
        scheduler.getNextWorkout(program, startDate, today);
    });
    
    function d(str){
        return new Date(Date.parse(str));
    }
    
});