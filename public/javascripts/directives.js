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
                scope.open = function(){
                        $('#' + scope.formatId(scope.modalCourse.className)).modal('toggle');
                }

                scope.close = function(){
                        $('#' + scope.formatId(scope.modalCourse.className)).modal('toggle');
                };

                scope.addCourseToSchedule = function(course, section){
                                scope.schedule.addCourse(course, course.sections.indexOf(section), scope.schedule.courses.length);
                };

            scope.strToInt = function(str){
                return parseInt(str, 10);
            }

                scope.formatId = function(className){
                        // console.log(className)
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

  function nodrag(scope, element, attr) {
  }

  function drag(scope, element, attr) {
    var ssPos = $('.sharedspace').offset();
    var position = element.offset();
    var startX = 0, startY = 0;
    //var startX = position.left, startY = position.top;
    //var x = scope.dish.xpos, y = scope.dish.ypos;
    var x = 0, y = 0;

      // update scope variable

    element.css({
    border: '1px solid red',
    backgroundColor: 'lightgrey',
    cursor: 'pointer'
    });

    element.on('mousedown', function(event) {
      position = element.offset();
      x = position.left + ssPos.left;
      y = position.top + ssPos.top;
      console.log("event! " + event.screenX + " " + event.screenY);
      console.log("listen! " + element.offset().left + " " + element.offset().top);
      console.log("ss! " + ssPos.left + " " + ssPos.top);
      console.log();

      console.log("position! " + position.left + " " + position.top);
      console.log("position plus ss! " + (position.left + ssPos.left) + " " + (position.top + ssPos.top));
      console.log();

      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;
      //startX = event.screenX;
      //startY = event.screenY;
      //startX = event.screenX - scope.dish.xpos;
      //startY = event.screenY - scope.dish.ypos;


      console.log("mousedown... " + x + " " + y);
      console.log("mousedown... start " + startX + " " + startY);
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      event.preventDefault();

      position = element.offset();

      x = event.screenX - startX;
      y = event.screenY - startY;

      console.log("offset x:" + startX + " y: " + startY);
      console.log("adjusted x:" + (x - ssPos.left) + " dy: " + (y - ssPos.top));

            //scope.dish.xpos = x;
            //scope.dish.ypos = y;
/*
          scope.$apply(function () {
            scope.dish.xpos = x;
            scope.dish.ypos = y;
          });
*/


      // update element position
/*
      element.css({
        left: (x) + 'px',
        top: (y) + 'px'
      });
*/
      
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

  function postLink(scope, element, iAttrs, ctrl) {

    element.on('mousedown', function(event) {
      event.preventDefault();
    });

    element.draggable({
        start: function() {
          var position = element.offset();
          console.log('start pos: ' + position.left + ' and ' + position.top);
        },
        drag: function() {
          scope.$watch(function () {
            scope.dish.xpos = element.css('left');
            scope.dish.ypos = element.css('top');
          });
        },
        stop: function() {
          var position = element.offset();
          console.log('stop pos: ' + position.left + ' and ' + position.top);

        }
      });
  }

  function lvlDraggable (scope, el, attrs, controller) {
      angular.element(el).attr("draggable", "true");
       
      el.bind("dragstart", function(e) {
          e.dataTransfer.setData('text', id);
          $rootScope.$emit("LVL-DRAG-START");
      });
       
      el.bind("dragend", function(e) {
          $rootScope.$emit("LVL-DRAG-END");
      });
  }

  //return drag;
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/candidate.html',
    link: drag
  }
});