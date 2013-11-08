var directives = angular.module('afterthink.directives', []);

directives.directive('draggable', function($document) {

  function drag(scope, element, attr) {
    /*
    var startX = 0, startY = 0, x = scope.dish.xpos, y = scope.dish.ypos;
      // update scope variable
      scope.$watch('dish', function () {
      scope.dish.xpos = x;
      scope.dish.ypos = y;
      }, true);

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - scope.dish.xpos;
      startY = event.screenY - scope.dish.ypos;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    //element.on('mousemove', mousemove);
    //element.on('mouseup', mouseup);

    function mousemove(event) {
      event.preventDefault();

      y = event.screenY - startY;
      x = event.screenX - startX;

      var position = element.offset();
      console.log("original pos x:" + position.left + " y: " + position.top);
      console.log("new pos x:" + x + " y: " + y);

      // update element position
      
      element.css({
        left:  x + 'px',
        top: y + 'px'
      });
      


    }

    function mouseup() {
      console.log("mouseup!");
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
*/
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

  //return drag;
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/candidate.html',
    /*scope: {
      dish: '&uniqueDish'
    },*/
    link: drag
  }
});


/*



    */