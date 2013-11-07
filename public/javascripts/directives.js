var directives = angular.module('afterthink.directives', []);

directives.directive('draggable', function($document) {

  function drag(scope, element, attr) {
    var startX = 0, startY = 0, x = 0, y = 0;

    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      //startX = event.screenX - x;
      //startY = event.screenY - y;
      startX = event.screenX - scope.dish.xpos;
      startY = event.screenY - scope.dish.ypos;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);

    });

    function mousemove(event) {
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

      // update scope variable
      
      scope.$apply(function () {
        scope.dish.xpos = x;
        scope.dish.ypos = y;
      });


    }

    function mouseup() {
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
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


directives.directive('shareable', function($document) {

  return {
    template: '<div class="sharedspace"><draggable ng-repeat="dish in dishes"></draggable></div>',
    restrict: 'E',
    scope: {
      dishes: '='
    },
    link: function (scope) {
      console.log("shareable dishes: " + scope.dishes);
    }
  }
});

/*

  return {
    //template: '<div id="box" ng-style="{ top: model.y, left: model.x}"><div ng-transclude></div></box>',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      model: '='
    },
    link: function postLink(scope, element, iAttrs, ctrl) {
      element.draggable({
          start: function() {
            console.log('start');
          },
          drag: function() {
            console.log('drag');
            scope.$apply(function read() {
              scope.model.x = element.css('top');
              scope.model.y = element.css('left');
            });
          },
          stop: function() {
            console.log('stop');
          }
        });
    }
  };
  */