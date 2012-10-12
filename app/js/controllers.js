'use strict';

/* Controllers */


function ListCtrl($scope) {
    $scope.tasks = [{title: "Walk dog", order: 3},
                    {title: "Buy groceries", order: 1},
                    {title: "Do other stuff", order: 2}];
    $scope.addTask = function() {
        $scope.tasks.push({title: $scope.nextTask, order:_.chain($scope.tasks)
                                                          .map(function (task) { return task.order})
                                                          .max()
                                                          .value()});
        $scope.nextTask = "";
    };
}
ListCtrl.$inject = ['$scope'];

function MyCtrl2() {
}
MyCtrl2.$inject = [];
