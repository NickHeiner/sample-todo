'use strict';

/* jasmine specs for controllers go here */

describe('ListCtrl', function(){
  var listCtrl, scope;

  beforeEach(function(){
    scope = {}
    listCtrl = new ListCtrl(scope);
  })

  it('should add new tasks', function() {
    scope.nextTask = "Foo"
    listCtrl.addTask();
    expect(scope.nextTask).toBe("");
  });
});


describe('MyCtrl2', function(){
  var myCtrl2;


  beforeEach(function(){
    myCtrl2 = new MyCtrl2();
  });


  it('should ....', function() {
    //spec body
  });
});
