'use strict';

function getOrder(task) { return task.order; }

/* Controllers */
function ListCtrl($scope) {
    $scope.tasks = [{title: "Walk dog", order: 3, dueDate: new Date("14 October 2012")},
                    {title: "Buy groceries", order: 1, dueDate: new Date("13 October 2012")},
                    {title: "Do other stuff", order: 2, dueDate: new Date("22 November 2012")}];
    $scope.addTask = function() {
        $scope.tasks.push({title: $scope.nextTask,
                           order: _.chain($scope.tasks)
                                   .map(getOrder)
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

function MyCtrl2() {
}
MyCtrl2.$inject = [];
