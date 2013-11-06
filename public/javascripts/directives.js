var directives = angular.module('afterthink.directives', []);

directives.directive('draggable', function($document) {

  console.log("LOAD DIRECTIVE");
  return function(scope, element, attr) {
  console.log(element);
  console.log(Object.keys(element));
    var startX = 0, startY = 0, x = 0, y = 0;
    element.css({
     position: 'relative',
     border: '1px solid red',
     backgroundColor: 'lightgrey',
     cursor: 'pointer'
    });
    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      console.log("mousemove");
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(event) {
      y = event.screenY - startY;
      x = event.screenX - startX;
      element.css({
        top: y + 'px',
        left:  x + 'px'
      });
    }

    function mouseup() {
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
  }
});