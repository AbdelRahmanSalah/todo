app.controller('main', function ($scope, $ionicModal, localStorageService) { //store the entities name in a variable

var taskData = 'task';
// localStorageService.remove(taskData);
//initialize the tasks scope with empty array
$scope.tasks = [];

//initialize the task scope with empty object
$scope.task = {};

//configure the ionic modal before use
$ionicModal.fromTemplateUrl('new-task-modal.html', {
   scope: $scope,
   animation: 'slide-in-up'
}).then(function (modal) {
   $scope.newTaskModal = modal;
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

$scope.getTasks = function () {
  //fetches task from local storage
  if (localStorageService.get(taskData)) {
      $scope.tasks = localStorageService.get(taskData);
  } else {
      $scope.tasks = [];
  }
}
$scope.getCompletedTasks = function () {
  //fetches task from local storage
  if (localStorageService.get(taskData)) {
      $scope.tasks = localStorageService.get(taskData);
      $scope.tasks = $scope.tasks.filter(function(task) {
        return task.completed;
      });
  } else {
      $scope.tasks = [];
  }
}

$scope.getUnCompletedTasks = function () {
  //fetches task from local storage
  if (localStorageService.get(taskData)) {
      $scope.tasks = localStorageService.get(taskData).filter(function(task) {
        return !task.completed;
      });
  } else {
      $scope.tasks = [];
  }
}

$scope.createTask = function () {
   //creates a new task
   $scope.task.guid = guid();
   $scope.tasks.push($scope.task);
   if(localStorageService.get(taskData)) {
     var bridge = localStorageService.get(taskData);
   } else {
     var bridge = [];
   }
   bridge.push($scope.task);
   localStorageService.set(taskData, bridge);
   $scope.task = {};
   //close new task modal
   $scope.newTaskModal.hide();

}
$scope.removeTask = function (guid) {
   //removes a task
   $scope.tasks = $scope.tasks.filter(function(task) {
     return task.guid != guid;
   });
   var bridge = localStorageService.get(taskData);
   bridge = bridge.filter(function(task) {
     return task.guid != guid;
   });
   localStorageService.set(taskData, bridge);
}
$scope.completeTask = function (guid) {
   //updates a task as completed
   var bridge = localStorageService.get(taskData);
   bridge = bridge.map(function(task) {
     if(task.guid == guid) {
        task.completed = $scope.tasks.filter(function(task2){
         return task.guid == guid;
       })[0].completed;
     }
     return task;
   });
  localStorageService.set(taskData, bridge);
}
$scope.openTaskModal = function () {
  $scope.newTaskModal.show();
}

$scope.closeTaskModal = function () {
  $scope.newTaskModal.hide();
}
})
