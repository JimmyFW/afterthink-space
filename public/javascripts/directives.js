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
      console.log(Object.keys(event.originalEvent.touches));
      //$("#ipad").append("<br />Touched by ipad");

      if(event.originalEvent.touches.length == 1) {
        //$("#ipadcoords").append("<br />touchdown coords: " + event.originalEvent.touches[0].screenX + " " + event.originalEvent.touches[0].screenY);
        //console.log("touchdown coords: " + event.originalEvent.touches[0].screenX + " " + event.originalEvent.touches[0].screenY);
      }
      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;

      startX = event.originalEvent.touches[0].screenX - x;
      startY = event.originalEvent.touches[0].screenY - y;


      //$document.on('touchmove', touchmove);
      //$document.on('touchend', touchup);
    });


    element.on('touchmove', function (event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      //console.log(Object.keys(event.originalEvent.touches[0]));
      //console.log("length of touches: " + event.originalEvent.touches.length);
      //$("ipad").append(event.originalEvent.touches[0]);

      if(event.originalEvent.touches.length != 1) {
        console.log("multiple touches, should not move");
      }
      else {
        console.log("trying to move");
      }

      x = event.originalEvent.touches[0].screenX - startX;
      y = event.originalEvent.touches[0].screenY - startY;
      //$("#ipadcoords").append("<br />touch coords: " + x + " " + y);
      //console.log("touch coords: " + x + " " + y);

      
      element.css({
        left: (x - ssPos.left) + 'px',
        top: (y - ssPos.top) + 'px'
      });
      
      scope.$apply(function () {
        scope.dish.xpos = element.css('left');
        scope.dish.ypos = element.css('top');
      });
    });

    element.on('touchend', function (event) {
      //console.log("touchup! " + x + " " + y);
      //$('#ipad').append("<br />stopped being touched by ipad");

      //$document.unbind('touchmove', touchmove);
      //$document.unbind('touchup', touchup);
    });

    element.on('mousedown', function (event) {
      mousedown(event);
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });
 
    function mousedown(event) {
      event.preventDefault();

      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;

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