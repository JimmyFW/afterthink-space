var services = angular.module('afterthink.services', []);

services.service('dishService', function () {
    var dishesRef = new Firebase('https://groupthought.firebaseio.com/sharedspace/dishes');
    angularFire(dishesRef, $scope, "dishes");

    return {
        dishesToScope: function (scope, dishes) {
            angularFire(dishesRef, scope, dishes);
        },
        addDish: function (dishKey) {
          console.log($scope.dishes);
          //var dish = $scope.menu[dishKey];
          var dish = jQuery.extend(true, {}, $scope.menu[dishKey]); // deep copy
          var uuid = guid();
          dish["id"] = uuid;
          dish["state"] = "proposed";
          dish["xpos"] = 110;
          dish["ypos"] = 110;
          $scope.dishes[uuid] = dish;

          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
          };

          function guid() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
          };

        },
        deleteDish = function (dishId) {
          var removed = $scope.dishes[dishId];
          delete $scope.dishes[dishId];
          console.log("deleting a dish! " + removed);
          console.log("removed dish: " + dishId);
          
        }
    };
});