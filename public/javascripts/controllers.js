var controllers = angular.module('afterthink.controllers', []);

controllers.controller('MyCtrl', ['$scope', 'angularFire',
  function($scope, angularFire) {
    console.log("LOAD MyCtrl");

    var items = new Firebase('https://groupthought.firebaseio.com/gamestate');
    angularFire(items, $scope, "items");

    var users = new Firebase('https://groupthought.firebaseio.com/users');
    angularFire(users, $scope, "users");

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
    $scope.photoWidth = 150;
    $scope.photoHeight = 100;

    $scope.addUser = function () {
      var index = $scope.users.indexOf($scope.myKey);
      console.log("index of mykey: " + index);
      if(index == -1) {
        console.log("Adding user: " + $scope.myKey);
        $scope.users.push($scope.myKey);
      }
      else {
        console.log("User already exists");
        console.log($scope.users);
      }
    }

    $scope.deleteUser = function (item) {
      var index = $scope.users.indexOf(item);
      $scope.users.splice(index, 1);
    }

    $scope.returnColor = function (state) {
      if(state=="accepted") {
        return {
          "border": "4px #00FF00 solid"
        }
      }
      else if(state=="proposed") {
        return {
          "border": "4px #CCCCCC solid"
        }
      }
      else if(state=="maybe") {
        return {
          "border": "4px #0000FF solid"
        }
      }
    }

    $scope.revertButtons = function (state, dishId) {
      $scope.dishes[dishId].state = "maybe";
    }

    $scope.returnButtons = function (state) {
      if(state=="accepted") {
        return {
          "display": "none"
        }
      }
      else {
        return {
          "display": "inline-block"
        }
      }
    }

    $scope.detailVisible = function () {
      if(!$scope.dishDetail) {
        return {
          "display": "none"
        };
      }
      else {
        return {
          "display": "inline-block"
        };
      }
    }


    $scope.fadePeppers1 = function (spiciness) {
      if(spiciness > 0) {
        return {
          "opacity": 1
        };
      }
      else {
        return {
          "opacity": .2
        };
      }
    }

    $scope.fadePeppers2 = function (spiciness) {
      if(spiciness > 1) {
        return {
          "opacity": 1
        };
      }
      else {
        return {
          "opacity": .2
        };
      }
    }

    $scope.fadePeppers2 = function (spiciness) {
      if(spiciness > 2) {
        return {
          "opacity": 1
        };
      }
      else {
        return {
          "opacity": .2
        };
      }
    }


    $scope.assignKey = function () {
      var uuid = guid();
      $scope.myKey = uuid;
      $scope.users.push($scope.myKey);

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      };

      function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
      };
    }

    $scope.deleteKey = function ($index) {
    }

    $scope.addItem = function (e) {
      if(e.keyCode != 13) return;
      $scope.items.push($scope.nextItem);
      $scope.nextItem = "";
    }

    $scope.deleteItem = function (index) {
      if(index >= $scope.items.length) {
        console.log("we have a problme. index: " + index);
        return;
      }
      // splice returns the elements removed and modifies the array in place
      $scope.items.splice(index, 1); // remove one item after the index
      console.log("removed item: " + index);
    }

    $scope.displayDetail = function (dishKey) {
      console.log("trying to display: " + dishKey);
      $scope.dishDetail = jQuery.extend(true, {}, $scope.menu[dishKey]); // deep copy
    }

    $scope.vegetarian = function (dishId) {
      if($scope.menu[dishId].vegetarian) {
        return {
          "opacity": 1
        };
      }
      else {
        return {
          "opacity": .2
        };
      }
    }

    $scope.glutenfree = function (dishId) {
      if($scope.menu[dishId]["gluten-free"]) {
        return {
          opacity: 1
        };
      }
      else {
        return {
          opacity: .2
        };
      }
    }

    $scope.addDish = function (dishKey) {

      console.log("adding dish: " + $scope.dishes);

      var dish = jQuery.extend(true, {}, $scope.menu[dishKey]); // deep copy
      var uuid = guid();
      dish["id"] = uuid;
      dish["state"] = "proposed";
      dish["xpos"] = 110;
      dish["ypos"] = 110;
      dish["startX"] = -1;
      dish["startY"] = -1;
      dish["author"] = $scope.myKey;
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

    }

    $scope.deleteDish = function (dishId, event) {

      event.preventDefault();

      var removed = $scope.dishes[dishId];
      delete $scope.dishes[dishId];
      console.log("deleting a dish! " + removed);
      console.log("removed dish: " + dishId);
      
    }

    $scope.acceptDish = function (dishId, event) {
      event.preventDefault();

      $scope.dishes[dishId].state = "accepted";
      console.log("accepted dish: " + dishId);
      
    }

    $scope.maybeDish = function (dishId, event) {
      event.preventDefault();

      $scope.dishes[dishId].state = "maybe";
      console.log("maybed dish: " + dishId);
      
    }

    $scope.moveDish = function (dishId, event) {
      if($scope.dishes[dishId].startX == -1) {
        return;
      }
      else {
        //console.log($scope.dishes[dishId].startX)
      }
      if($scope.dishes[dishId].startY == -1) return;
      //console.log(event);
      event.preventDefault();
      //console.log($scope.dishes[dishId]);

      var y = event.screenY - $scope.dishes[dishId].startY;
      var x = event.screenX - $scope.dishes[dishId].startX;
      console.log(x);
      console.log(y);

      // update scope variable
      //$scope.dishes[dishId].xpos = $scope.dishes[dishId].xpos + 1;
      //$scope.dishes[dishId].ypos = $scope.dishes[dishId].ypos + 1;
      $scope.dishes[dishId].xpos = x;
      $scope.dishes[dishId].ypos = y;
    }

    $scope.grabDish = function (dishId, event) {
      //console.log(event);
      event.preventDefault();

      $scope.dishes[dishId].startX = event.screenX - $scope.dishes[dishId].xpos;
      $scope.dishes[dishId].startY = event.screenY - $scope.dishes[dishId].ypos;
      /*

      var y = event.screenY - $scope.dishes[dishId].startY;
      var x = event.screenX - $scope.dishes[dishId].startX;

      // update scope variable
      $scope.dishes[dishId].xpos = x;
      $scope.dishes[dishId].ypos = y;
      */
    }

    $scope.releaseDish = function (dishId, event) {
      //console.log(event);
      event.preventDefault();

      $scope.dishes[dishId].startX = -1;
      $scope.dishes[dishId].startY = -1;
    }

    $scope.updatePos = function (dishId) {
      console.log("dish id: " + dishId);
      var positionStyle = {
        'left': $scope.dishes[dishId].xpos + 'px',
        'top': $scope.dishes[dishId].ypos + 'px'
      };
      console.log(positionStyle);
      //console.log($scope.dishes[dishId].startX + ' ' + $scope.dishes[dishId].startY);
      return positionStyle;
    }

  }
]);

controllers.controller('HomeController', ['$scope', function ($scope) {
  $scope.model = {
    title: "Human Factors in Interface Design",
    authors: "Kai Austin, Zachary Homans, James Wu"
  }
}]);