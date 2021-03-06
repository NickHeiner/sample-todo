'use strict';


// Declare app level module which depends on filters, and services
angular.module('sampleTodo', ['sampleTodo.filters', 'sampleTodo.services', 'sampleTodo.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: ListCtrl});
    $routeProvider.when('/taskDetail/:taskId', {templateUrl: 'partials/taskDetail.html', controller: TaskDetailCtrl});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);
