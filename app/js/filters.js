'use strict';

/* Filters */

angular.module('sampleTodo.filters', []).
  filter('disabledIfMinTask', [function() {
    return function(task, tasks) {
      return task.order === _.min(_.map(tasks, utils.getOrder)) ? "disabled" : "";
    }
  }]).
  filter('disabledIfMaxTask', [function() {
    return function(task, tasks) {
        return task.order === _.max(_.map(tasks, utils.getOrder)) ? "disabled" : "";
    }
}]);
