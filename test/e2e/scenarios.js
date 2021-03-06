'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

// TODO some of these may be better as unit tests but I haven't been able to get them set up
describe('sample todo', function() {

  var testData;

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');

    // TODO what is the best way to get test data?
    testData = [
        {"id": 0, "title": "Walk dog", "order": 3, "dueDate": "2012-10-16T13:11:01.420Z", "description": "marmalade"},
        {"id": 1, "title": "Buy groceries", "order": 1, "dueDate": "2012-10-13T13:11:01.420Z", "description": "gotta do the cookin by the book"},
        {"id": 2, "title": "Do other stuff", "order": 2, "dueDate": "2012-11-22T13:11:01.420Z", "description": "widsom"}
    ]

  });


  it('should automatically redirect to /list when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/list");
  });

  describe('list', function() {

    beforeEach(function() {
      browser().navigateTo('#/list');
    });


    it('should render list when user navigates to /list', function() {
      expect(element('[ng-view] h2:first').text()).
        toMatch(/Tasks/);
    });

    it('should add a new task when user hits "add"', function() {
       var initialTaskCount = repeater('li', "Tasks").count();
       input('nextTask').enter("do work");
       element("input", "submit").click();
       expect(repeater('li', "Tasks").count() === initialTaskCount + 1);
       expect(input('nextTask').val()).toBe("");
       expect(element(".taskItem:last h3", "Last Task Name").text()).toMatch(/do work/);
       expect(element(".taskItem:last .taskDate", "Last Task Date").text()).toBe("11/01/2012");
    });

    it('should disable the first / last up / down buttons respectively', function() {
       expect(element(".taskItem button:first", "first up button").attr('disabled')).toBe("disabled");
       expect(element(".taskItem:last button:last", "last down button").attr('disabled')).toBe("disabled");
    });

    // TODO: these tests don't do anything
    it('should move an item up in the list when you hit the "up" button', function() {
       // brittle: this assumes that titles are unique, and is dependent on the test data
       // TODO: How can you use element("selector") to get that element's text?
       element(".taskItem:last button:first").click();
       expect(element(".taskItem:last h3", "last task title").text()).not().toMatch("do work");
    });

    it('should move an item down in the list when you hit the "down" button', function() {
        element(".taskItem:first button:last").click();
        expect(element(".taskItem:last h3", "last task title").text()).not().toMatch("walk dog");
    });

    it('should navigate to the correct task via the title', function() {
        element(".taskItem:first a").click();
        expect(browser().location().url()).toBe('/taskDetail/1');
    });

    it('should assign classes to due dates', function() {
        expect(element('.taskDate:first').attr('class')).toBe("taskDate due-date-passed");
        expect(element('.taskDate:last').attr('class')).toBe("taskDate due-date-soon");
    });

  });

  describe('taskDetail', function() {
    beforeEach(function () {
        browser().navigateTo("#/taskDetail/0");
    });

    it('should include the right task info', function() {
        expect(element('.taskTitle').text()).toEqual(testData[0].title);
        expect(element('.taskDescription').text()).toEqual(testData[0].description);
    });

    it('should make title editable', function() {
       expect(element('.taskTitleEdit').attr('class')).toBe('taskTitleEdit hidden');
       element('.taskTitle').click();
       expect(element('.taskTitleEdit').attr('class')).toMatch(/taskTitleEdit ?/);
    });
  });
});
