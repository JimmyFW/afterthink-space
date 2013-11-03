var controllers = angular.module('afterthink.controllers', []);

controllers.controller('MyCtrl', ['$scope', 'angularFire',
  function($scope, angularFire) {
    var url = 'https://groupthought.firebaseio.com/gamestate';
    $scope.items = angularFire(new Firebase(url), $scope, "items");
    var url = 'https://groupthought.firebaseio.com/sharedspace/dishes';
    $scope.dishes = angularFire(new Firebase(url), $scope, "dishes");
    var url = 'https://groupthought.firebaseio.com/menu';
    $scope.menu = angularFire(new Firebase(url), $scope, "menu");
  }
]);

controllers.controller('HomeController', ['$scope', function ($scope) {
  $scope.model = {
    title: "Human Factors in Interface Design",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}]);