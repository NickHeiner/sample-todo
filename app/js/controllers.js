'use strict';
/* Controllers */
function ListCtrl($scope, TaskData) {
    $scope.tasks = TaskData.query();
    $scope.addTask = function() {
        $scope.tasks.push({title: $scope.nextTask,
                           order: _.chain($scope.tasks)
                                   .map(utils.getOrder)
                                   .max()
                                   .value(),
                           dueDate: new Date("1 November 2012")
                          });
        $scope.nextTask = "";
    };

    $scope.moveTaskUp = function(moveTask) {
        $scope.tasks = _.sortBy($scope.tasks, getOrder);
        for (var i = 0; i < $scope.tasks.length; i++) {
            if (moveTask === $scope.tasks[i] && i !== 0) {
                var origOrder = moveTask.order;
                moveTask.order = $scope.tasks[i - 1].order;
                $scope.tasks[i - 1].order = origOrder;
                return;
            }
        }
    };

    $scope.moveTaskDown = function(moveTask) {
        $scope.tasks = _.sortBy($scope.tasks, getOrder);
        for (var i = $scope.tasks.length - 1; i >= 0; i--) {
            if (moveTask === $scope.tasks[i] && i !== $scope.tasks.length) {
                var origOrder = moveTask.order;
                moveTask.order = $scope.tasks[i + 1].order;
                $scope.tasks[i + 1].order = origOrder;
                return;
            }
        }
    }
}
ListCtrl.$inject = ['$scope', 'TaskData'];

function TaskDetailCtrl($scope, $routeParams, TaskData) {
    TaskData.query(function(tasks) {
        $scope.task = _.find(tasks, function (task) {
            return task.id == $routeParams.taskId;
        });
    })
}
TaskDetailCtrl.$inject = ['$scope', '$routeParams', 'TaskData'];
