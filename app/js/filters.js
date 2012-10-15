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
  }]).
  filter('dateStyling', [function() {
    return function(dateStr) {
        if (new Date() > new Date(dateStr)) {
            return "due-date-passed";
        }
        var nearFuture = new Date();
        nearFuture.setDate(nearFuture.getDate() + 2);
        if (nearFuture > new Date(dateStr)) {
            return "due-date-soon";
        }
    }
  }]);
