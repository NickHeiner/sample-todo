'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('sampleTodo.services', ['ngResource'])
    .factory('TaskData', function($resource) {
       return $resource('tasks.json');
    });