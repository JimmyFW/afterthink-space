var controllers = angular.module('afterthink.controllers', []);

controllers.controller('MyCtrl', ['$scope', 'angularFire',
  function($scope, angularFire) {
    console.log("LOAD MyCtrl");

    var url = 'https://groupthought.firebaseio.com/gamestate';
    angularFire(new Firebase(url), $scope, "items");

    var url = 'https://groupthought.firebaseio.com/sharedspace/dishes';
    angularFire(new Firebase(url), $scope, "dishes");

    var url = 'https://groupthought.firebaseio.com/menu';
    angularFire(new Firebase(url), $scope, "menu");

    $scope.addItem = function (e) {
      if(e.keyCode != 13) return;
      $scope.items.push($scope.nextItem);
      $scope.nextItem = "";
    }

    $scope.deleteItem = function (e, index) {
      if(index >= $scope.items.length) return;
      // splice returns the elements removed and modifies the array in place
      $scope.items.splice(index, 1); // remove one item after the index
      $scope.debugIndex = index;
      e.preventDefault();
    }
  }
]);

controllers.controller('HomeController', ['$scope', function ($scope) {
  $scope.model = {
    title: "Human Factors in Interface Design",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}]);