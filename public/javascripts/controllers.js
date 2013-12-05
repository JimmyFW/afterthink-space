var controllers = angular.module('afterthink.controllers', []);

controllers.controller('MyCtrl', ['$scope', 'angularFire',
  function($scope, angularFire) {
    console.log("LOAD MyCtrl");

    var users = new Firebase('https://groupthought.firebaseio.com/users');
    angularFire(users, $scope, "users");

    var dishes = new Firebase('https://groupthought.firebaseio.com/dishes');
    angularFire(dishes, $scope, "dishes");

    var menu = new Firebase('https://groupthought.firebaseio.com/menu');
    angularFire(menu, $scope, "menu");

    var sections = new Firebase('https://groupthought.firebaseio.com/sections');
    angularFire(sections, $scope, "sections");

    var done = new Firebase('https://groupthought.firebaseio.com/done');
    angularFire(done, $scope, "done");

    var debug = new Firebase('https://groupthought.firebaseio.com/debug');
    angularFire(debug, $scope, "debug");

    dishes.on('child_added', function (snapshot) {
      console.log(snapshot.name());
    });

    dishes.on('child_removed', function (snapshot) {
      console.log(snapshot.name());
    });

    $scope.currentSection = "starters";
    $scope.photoWidth = 100;
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

    $scope.deleteUser = function (user) {
      console.log("Hello");

      for (var key in $scope.dishes) {
        var value = $scope.dishes[key];
        console.log(value.author + ' ' + user);
        if(value.author == user) {
          var removed = $scope.dishes[value.id];
          delete $scope.dishes[value.id];
          console.log("deleting a dish! " + removed);
          console.log("removed dish: " + value.id);
        }
      }

      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1);

    }

    $scope.switchUser = function (user) {
      $scope.myKey = user;
    }

    $scope.filterNotYou = function(user) {
      if(!$scope.myKey) {
        return true;
      }
      else {
        console.log(user);
        return user !== $scope.myKey;
      }
    }

    $scope.returnDebugStyle = function () {
      if($scope.debug == true) {
        return {
          "display": "block"
        }
      }
      else {
        return {
          "display": "none"
        }
      }
      
    }

    $scope.returnFinalOrderStyle = function () {
      var styleObj = {};
      console.log($scope.done);
      if($scope.done){
        styleObj["display"] = "block";
      }
      else {
        styleObj["display"] = "none";
      }
      return styleObj;
    }

    $scope.returnMenuItemStyle = function (dishKey) {
      var styleObj = {};
      for (var key in $scope.dishes) {
        //var lookedAt = [];
        var value = $scope.dishes[key];
        //lookedAt.push(key);
        if(dishKey == value.title) {
          if(value.state=="accepted") {
            styleObj["border-color"] = "#00FF00";
          }
          if(value.state=="maybe") {
            if(styleObj["border-color"] != "#00FF00") {
              styleObj["border-color"] = "#0000FF";
            }
          }
          if(value.state=="proposed") {
            if(styleObj["border-color"] != "#00FF00" && styleObj["border-color"] != "#0000FF") {
              styleObj["border-color"] = "#CCCCCC";
            }
          }

        }
      }
      return styleObj;
    }

    $scope.returnAddButtonStyle = function (dishKey) {
      var styleObj = {};
      for (var key in $scope.dishes) {
        var value = $scope.dishes[key];
        if(dishKey == value.title) {
          if(value.state =="accepted" || value.state=="maybe" || value.state=="proposed"){
            styleObj["display"] = "none";
          }
        }
      }
      return styleObj;
    }
    $scope.returnLikeButtonStyle = function (dishKey) {
      var styleObj = {};
      for (var key in $scope.dishes) {
        var value = $scope.dishes[key];
          if(dishKey == value.title) {
          if(value.state =="accepted" || value.state=="maybe" || value.state=="proposed"){
            styleObj["display"] = "inline-block";
          }
        }
      }
      return styleObj;
    }

    $scope.returnBoxStyle = function (state) {
      var styleObj = {
        "display": "inline-block"
      };
      if(state=="accepted") {
        //styleObj["border"] = "4px #00FF00 solid";
        styleObj["width"] = 100;
      }
      else if(state=="proposed") {
        //styleObj["border"] = "4px #CCCCCC solid";
        styleObj["width"] = 160;
        //styleObj["height"] = 100;
      }
      else if(state=="maybe") {
        //styleObj["border"] = "4px #0000FF solid";
        styleObj["width"] = 100;
        //styleObj["height"] = 70;
      }
      return styleObj;
    }

    $scope.returnDishStyle = function (state) {
      var styleObj = {
        "width": $scope.photoWidth,
        "height": $scope.photoHeight
      }
      if(state=="accepted") {
        styleObj["border"] = "4px #00FF00 solid";
      }
      else if(state=="proposed") {
        styleObj["border"] = "4px #CCCCCC solid";
      }
      else if(state=="maybe") {
        styleObj["border"] = "4px #0000FF solid";
        styleObj["width"] = 50;
        styleObj["height"] = 50;
      }
      return styleObj;
    }

    $scope.returnButtons = function (state) {
      var styleObj = {
        "width": $scope.photoWidth,
        "height": $scope.photoHeight
      }
      if(state=="accepted") {
        styleObj["display"] = "none";
      }
      else if(state=="proposed") {
        styleObj["display"] = "inline-block";
      }
      else if(state=="maybe") {
        styleObj["display"] = "none";
      }
      return styleObj;
    }

    $scope.revertButtons = function (state, dishId) {
      var author = $scope.dishes[dishId].author;
      if(author == $scope.myKey) {
        if($scope.dishes[dishId].state == "accepted") {
          $scope.dishes[dishId].state = "proposed";
        }
        else if($scope.dishes[dishId].state == "maybe") {
          $scope.dishes[dishId].state = "proposed";
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

    $scope.clearAll = function () {
      $scope.dishes = {"Dummy":{"Hello": "Dummy"}};
      $scope.users = ["Dummy"];
    }

    $scope.displayDetail = function (dishKey) {
      console.log("trying to display: " + dishKey);
      $scope.dishDetail = jQuery.extend(true, {}, $scope.menu[dishKey]); // deep copy
    }

    $scope.changeSection = function (section) {
      console.log("trying to change section: " + section);
      $scope.currentSection = section; // deep copy
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

      var index = $scope.users.indexOf($scope.myKey);

      if(index > -1) {

        console.log("adding dish: " + $scope.dishes);
        console.log("adding dish: " + $scope.menu[dishKey].title);

        var dish = jQuery.extend(true, {}, $scope.menu[dishKey]); // deep copy
        var uuid = $scope.menu[dishKey].title;
        dish["id"] = uuid;
        dish["state"] = "proposed";
        dish["author"] = $scope.myKey;
        dish["likes"] = 0;
        dish["wholiked"] = ["Waiter"];
        $scope.dishes[uuid] = dish;

        /*function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
                     .toString(16)
                     .substring(1);
        };

        function guid() {
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                 s4() + '-' + s4() + s4() + s4();
        };*/
      }

    }

    $scope.deleteDish = function (dishId) {

      //event.preventDefault();

      var author = $scope.dishes[dishId].author;
      if(author == $scope.myKey) {

      var removed = $scope.dishes[dishId];
      delete $scope.dishes[dishId];
      console.log("deleting a dish! " + removed);
      console.log("removed dish: " + dishId);
      }
      
    }

    $scope.acceptDish = function (dishId, event) {
      event.preventDefault();

      var author = $scope.dishes[dishId].author;
      if(author == $scope.myKey) {

      $scope.dishes[dishId].state = "accepted";
      console.log("accepted dish: " + dishId);

      }
      
    }

    $scope.maybeDish = function (dishId, event) {
      event.preventDefault();

      var author = $scope.dishes[dishId].author;
      if(author == $scope.myKey) {

      $scope.dishes[dishId].state = "maybe";
      console.log("maybed dish: " + dishId);
      }
      
    }

    $scope.likeDish = function (dishKey) {

      var index = $scope.users.indexOf($scope.myKey);

      if(index > -1) {

        console.dir("liking dish: " + $scope.dishes[dishKey]);
        console.log("liking dish: " + $scope.dishes[dishKey]["likes"]);

        var dishLikedList= $scope.dishes[dishKey]["wholiked"];
        var myKey = $scope.myKey;
        console.log(dishLikedList);
        //Check to see if the clicker has liked the item before
        for (var i=0; i<dishLikedList.length; i++){
          if (myKey == dishLikedList[i]){
            console.log("You already liked this!");
            return;
          }
        }
          //If they have not, then up the like and note they have liked it
          $scope.dishes[dishKey]["likes"] += 1;
          $scope.dishes[dishKey]["wholiked"].push($scope.myKey);
      }

    }

    $scope.callWaiter = function () {
      console.log('Bell has been rung');
      $('#wrapper').hide();
      $scope.done = true;

      /*
      var answer = confirm("Hello! I'm your waiter." + $scope.dishes);
      if (answer == true){
          return true;
      }else{
          return false;
      }
      */
    }

    $scope.confirmOrder = function () {
      console.log("Order has been confirmed");
      for(var key in $scope.dishes) {
        if(key!="9be4a913-83c2-c90e-b0c0-9795500f92d3") {
          var removed = $scope.dishes[key];
          delete $scope.dishes[key];
          console.log("deleting a dish! " + removed);
          console.log("removed dish: " + key);
        }
      }
      $scope.users.splice(1, $scope.users.length+1);
      /*
      for(var i=0; i<$scope.users.length; i++) {
        if($scope.users[i]!="On The House") {
          $scope.users.splice(i, 1);
        }
      }
      */
      /*
      $scope.watch(function() {
        $scope.done = false;
      });*/
      $scope.done = false;
      $('#wrapper').show();

    }

    $scope.noConfirmOrder = function () {
      $scope.done = false;
      $('#wrapper').show();
      
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