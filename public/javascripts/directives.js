var directives = angular.module('afterthink.directives', []);

directives.directive('draggable', function($document) {

  function drag(scope, element, attr) {

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
          })
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
    link: postLink
  }
});


/*

    var startX = 0, startY = 0, x = 0, y = 0;

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;
      //startX = event.screenX - scope.dish.xpos;
      //startY = event.screenY - scope.dish.ypos;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);


    });

    function mousemove(event) {
      var y = event.screenY - startY;
      var x = event.screenX - startX;

      var position = element.offset();
      console.log("original pos x:" + position.left + " y: " + position.top);
      console.log("new pos x:" + x + " y: " + y);

      // update element position
      element.css({
        left:  x + 'px',
        top: y + 'px'
      });

      // update scope variable
      
      scope.$apply(function () {
        scope.dish.xpos = x;
        scope.dish.ypos = y;
      });

    }

    function mouseup() {
      console.log("mouseup!");
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }

    */