var controllers = angular.module('afterthink.controllers', []);

controllers.controller('MyCtrl', ['$scope', 'angularFire',
  function($scope, angularFire) {
    console.log("LOAD MyCtrl");

    var items = new Firebase('https://groupthought.firebaseio.com/gamestate');
    angularFire(items, $scope, "items");

    var dishes = new Firebase('https://groupthought.firebaseio.com/sharedspace/dishes');
    angularFire(dishes, $scope, "dishes");

    var menu = new Firebase('https://groupthought.firebaseio.com/menu');
    angularFire(menu, $scope, "menu");

    dishes.on('child_added', function (snapshot) {
      console.log(snapshot.name());
    });

    dishes.on('child_removed', function (snapshot) {
      console.log(snapshot.name());
    });

    $scope.currentSection = 0;

    $scope.addItem = function (e) {
      if(e.keyCode != 13) return;
      $scope.items.push($scope.nextItem);
      $scope.nextItem = "";
    }

    $scope.deleteItem = function (index) {
      if(index >= $scope.items.length) return;
      // splice returns the elements removed and modifies the array in place
      $scope.items.splice(index, 1); // remove one item after the index
      $scope.debugIndex = index;
    }

    $scope.addDish = function (dishKey) {
      console.log($scope.dishes);
      var dish = $scope.menu[dishKey];
      dish["id"] = dishKey;
      dish["state"] = "proposed";
      $scope.dishes.push(dish);
    }

    $scope.deleteDish = function (dishKey) {
      console.log("deleting a dish!");
      var removed = $scope.dishes.splice(dishKey, 1);
      console.log("removed dish :" + removed);
    }

  }
]);

controllers.controller('HomeController', ['$scope', function ($scope) {
  $scope.model = {
    title: "Human Factors in Interface Design",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}]);