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
      //event.preventDefault();
      console.log(Object.keys(event.originalEvent.targetTouches));
      //$("#ipad").append("<br />Touched by ipad");

      if(event.originalEvent.targetTouches.length == 1) {
        //$("#ipadcoords").append("<br />touchdown coords: " + event.originalEvent.targetTouches[0].screenX + " " + event.originalEvent.targetTouches[0].screenY);
        //console.log("touchdown coords: " + event.originalEvent.targetTouches[0].screenX + " " + event.originalEvent.targetTouches[0].screenY);
      }
      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;

      startX = event.originalEvent.targetTouches[0].screenX - x;
      startY = event.originalEvent.targetTouches[0].screenY - y;


      //$document.on('touchmove', touchmove);
      //$document.on('touchend', touchup);
    });


    element.on('touchmove', function (event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      //console.log(Object.keys(event.originalEvent.targetTouches[0]));
      //console.log("length of touches: " + event.originalEvent.targetTouches.length);
      //$("ipad").append(event.originalEvent.targetTouches[0]);
      /*
      if(event.originalEvent.targetTouches.length != 1) {
        console.log("multiple touches, should not move");
      }
      else {
        console.log("trying to move");
      }
      */

      x = event.originalEvent.targetTouches[0].screenX - startX;
      y = event.originalEvent.targetTouches[0].screenY - startY;
      
      element.css({
        left: (x - ssPos.left) + 'px',
        top: (y - ssPos.top) + 'px'
      });
      
      scope.dish.xpos = element.css('left');
      scope.dish.ypos = element.css('top');

      if(x > 870 && y > 420) {
        $('.trash').css({
          border: '4px solid #000000'
        });
      }
      else {
        $('.trash').css({
          border: '0'
        });
      }
      
    });

    element.on('touchend', function (event) {
      scope.$apply(function () {
        scope.dish.xpos = element.css('left');
        scope.dish.ypos = element.css('top');
      });

      if(x > 870 && y > 420) {
        console.log('deleting item!' + $(element).attr('uniqueDish'));
        scope.deleteDish($(element).attr('uniqueDish'));
        $('.trash').css({
          border: '0'
        });
      }
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

      if(x > 910 && y > 460) {
        $('.trash').css({
          border: '4px solid #000000'
        });
      }
      else {
        $('.trash').css({
          border: '0'
        });
      }
    }

    function mouseup() {
      console.log("mouseup! " + x + " " + y);
      
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);

      if(x > 910 && y > 460) {
        console.log('deleting item!' + $(element).attr('uniqueDish'));
        scope.deleteDish($(element).attr('uniqueDish'));
        $('.trash').css({
          border: '0'
        });
      }
    }
  }

  return {
    restrict: 'E',
    transclude: true,
    /*
    scope: {
      ddd: '=uniqueDish'
    },*/
    templateUrl: 'templates/candidate.html',
    link: drag
  }
});
