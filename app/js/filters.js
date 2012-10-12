'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('disabledIfMinTask', [function() {
    return function(task, tasks) {
      return task.order === _.min(_.map(tasks, function(task) { return task.order; })) ? "disabled" : "";
    }
  }]).
  filter('disabledIfMaxTask', [function() {
    return function(task, tasks) {
        return task.order === _.max(_.map(tasks, function(task) { return task.order; })) ? "disabled" : "";
    }
}]);
