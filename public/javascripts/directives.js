var directives = angular.module('afterthink.directives', []);

directives.directive('draggable', function($document) {

  function drag(scope, element, attr) {
  //return function(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0;
    /*
    element.css({
     position: 'relative',
     border: '1px solid red',
     '-moz-border-radius': '15px',
     border-radius: '15px',
     backgroundColor: 'lightgrey',
     cursor: 'pointer'
    });
    */
    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
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

  return drag;
  /*
  return {
    scope: {},
    link: drag
  };
  */
});