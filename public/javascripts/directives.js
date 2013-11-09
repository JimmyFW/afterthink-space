var directives = angular.module('afterthink.directives', []);

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
    var startX = 0, startY = 0, x = scope.dish.xpos, y = scope.dish.ypos;
      // update scope variable

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - scope.dish.xpos;
      startY = event.screenY - scope.dish.ypos;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      event.preventDefault();

      y = event.screenY - startY;
      x = event.screenX - startX;

      var position = element.offset();
      console.log("original pos x:" + position.left + " y: " + position.top);
      console.log("new pos x:" + x + " y: " + y);

            scope.dish.xpos = x;
            scope.dish.ypos = y;
/*
          scope.$apply(function () {
            scope.dish.xpos = x;
            scope.dish.ypos = y;
          });
*/

      // update element position
      /*
      element.css({
        left: x + 'px',
        top: y + 'px'
      });

      scope.$watch(function () {
        scope.dish.xpos = element.css('left');
        scope.dish.ypos = element.css('top');
      });
      */
    }

    function mouseup() {
      console.log("mouseup!");
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
    link: nodrag
  }
});