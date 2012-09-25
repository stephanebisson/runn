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


  xdescribe('view2', function() {
 
    beforeEach(function() {
      browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});
