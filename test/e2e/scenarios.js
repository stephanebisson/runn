'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('/apps/runn/index.html');
  });
  
  it('should go to login page', function(){
      expect(browser().location().url()).toBe("/login");
  });

  describe('login page', function() {

    it('should login with correct credentials', function() {
        input('username').enter('admin');
        input('password').enter('admin');
        element('#login').click();
        expect(browser().location().url()).toBe("/mytraining");
    });

    it('should fail to login with incorrect credentials', function() {
        input('username').enter('asdf');
        input('password').enter('qwerty');
        element('#login').click();
        expect(browser().location().url()).toBe("/login");
        expect(binding('error')).toBe('Login failed');
    });
  });
  
  describe('logout link', function(){
      
      beforeEach(function(){
          input('username').enter('admin');
          input('password').enter('admin');
          element('#login').click();
          
      });
      
      it('should show on the training page', function(){
          expect(element('#logout').text()).toBe('logout');
      });
      
      it('should allow to logout', function(){
            element('#logout').click();
            expect(browser().location().url()).toBe("/login");
            expect(element('#logout')).toBeUndefined();
        });
  });

  describe('user journey', function(){
      it('does everything but the kitchen sink', function(){
          // click signup tab
          // enter name, username, password
          
          // click signup
          // select 1 training program and start date
          // confirm
          // view training schedule
          // view next workout details
          // mark workout as done
          // view next workout
          // mark workout as attempted
          // view next workout (overdue)
      });
  });

});
