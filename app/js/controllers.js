'use strict';
/* Controllers */
function ListCtrl($scope) {
    $scope.tasks = utils.data;
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
ListCtrl.$inject = ['$scope'];

function TaskDetailCtrl($scope, $routeParams) {
    $scope.task = _.find(utils.data, function (task) {
        return task.id == $routeParams.taskId;
    });
    //$scope.task = data[0];
}
TaskDetailCtrl.$inject = ['$scope', '$routeParams'];
