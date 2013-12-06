var directives = angular.module('afterthink.directives', []);


directives.directive('waiterModal', function(){
  return {
    restrict: 'A',
    scope: {
      modalCourse: '=modalCourse',
      schedule: '=schedule',
    },
    templateUrl: "templates/waiter.html",
    link: function (scope, elem, attrs) {
      scope.open = function() {
        $('#' + scope.formatId(scope.modalCourse.className)).modal('toggle');
      }

      scope.close = function() {
        $('#' + scope.formatId(scope.modalCourse.className)).modal('toggle');
      };

      scope.addCourseToSchedule = function(course, section) {
        scope.schedule.addCourse(course, course.sections.indexOf(section), scope.schedule.courses.length);
      };

      scope.strToInt = function(str) {
        return parseInt(str, 10);
      }

      scope.formatId = function(className) {
        return className.split(" ").join("");
      };
    }
  };
});


directives.directive('detailView', function($document) {
  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'templates/detail_view.html'
  }
});


directives.directive('draggable', function($document) {

  function nodrag(scope, element, attr) {}

  function drag(scope, element, attr) {
    var ssPos = $('.sharedspace').offset(); // positoin
    var position = element.offset();
    var startX = 0, startY = 0;
    var x = 0, y = 0;


    element.on('touchstart', function (event) {
      event.preventDefault();
      console.log("touchstart targetTouches list");
      console.log(event.originalEvent.targetTouches);
      $("#ipad").append("<br />Touched by ipad");
      touchdown(event); // currently only prints a debug statement
      //$document.on('touchmove', touchmove);
      //$document.on('touchend', touchup);
    });


    element.on('touchmove', function (event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      console.log(event.originalEvent.targetTouches[0]);
      console.log("length of touches: " + event.originalEvent.targetTouches.length);
      //touchmove(event); // this is where the magic happens


      $("ipad").append(event.originalEvent.targetTouches[0]);

      if(event.originalEvent.targetTouches.length != 1) {
        $("ipad").append("got messed up");
        return;
      }

      $("ipad").append("trying to move");

      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;

      startX = event.originalEvent.targetTouches[0].screenX - x;
      startY = event.originalEvent.targetTouches[0].screenY - y;

      x = event.originalEvent.targetTouches[0].screenX - startX;
      y = event.originalEvent.targetTouches[0].screenY - startY;
      $("#ipadcoords").append("<br />touch coords: " + x + " " + y);
      
      element.css({
        left: (x - ssPos.left) + 'px',
        top: (y - ssPos.top) + 'px'
      });
      
      scope.$watch(function () {
        scope.dish.xpos = element.css('left');
        scope.dish.ypos = element.css('top');
      });
    });

    element.on('touchend', function (event) {
      touchup(); // currently only prints a debug statement
    });


    function touchdown(event) {
      event.preventDefault();
      if(event.originalEvent.targetTouches.length == 1) {
        $("#ipadcoords").append("<br />touchdown coords: " + event.originalEvent.targetTouches[0].screenX + " " + event.originalEvent.targetTouches[0].screenY);
      }
    }

    function touchmove(event) {
      event.preventDefault();

      $("ipad").append(event.originalEvent.targetTouches);

      if(event.originalEvent.targetTouches.length != 1) {
        $("ipad").append("got messed up");
        return;
      }

      $("ipad").append("trying to move");

      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;

      startX = event.originalEvent.targetTouches[0].screenX - x;
      startY = event.originalEvent.targetTouches[0].screenY - y;

      x = event.originalEvent.targetTouches[0].screenX - startX;
      y = event.originalEvent.targetTouches[0].screenY - startY;
      $("#ipadcoords").append("<br />touch coords: " + x + " " + y);
      
      element.css({
        left: (x - ssPos.left) + 'px',
        top: (y - ssPos.top) + 'px'
      });
      
      scope.$watch(function () {
        scope.dish.xpos = element.css('left');
        scope.dish.ypos = element.css('top');
      });
      
    }

    function touchup() {
      //console.log("touchup! " + x + " " + y);
      $('#ipad').append("<br />stopped being touched by ipad");

      //$document.unbind('touchmove', touchmove);
      //$document.unbind('touchup', touchup);
    }


    element.on('mousedown', function (event) {
      $("#ipad").append("<br />Touched by mouse");
      mousedown(event);
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousedown(event) {

      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;

      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;
    }

    function mousemove(event) {
      event.preventDefault();

      position = element.offset();

      x = event.screenX - startX;
      y = event.screenY - startY;
      
      element.css({
        left: (x - ssPos.left) + 'px',
        top: (y - ssPos.top) + 'px'
      });
      
      scope.$watch(function () {
        scope.dish.xpos = element.css('left');
        scope.dish.ypos = element.css('top');
      });
      
    }

    function mouseup() {
      console.log("mouseup! " + x + " " + y);
      $("#ipad").append("<br />stopped being touched by mouse");
      
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
  }

  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/candidate.html',
    link: drag
  }
});