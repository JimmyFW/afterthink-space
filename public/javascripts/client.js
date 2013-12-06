var Site = angular.module('Site', ['ngRoute', 'afterthink.controllers', 'afterthink.directives', 'firebase', 'ngTouch']);

Site.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'templates/index.html',
      controller: 'MyCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

Site.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }

        return Object.keys(obj).map(function (key) {
            return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
        });
    }
});

/*
Site.filter('notEqual', function (friend) {
  return friend.group !== "group2"; 
  <script src="//code.angularjs.org/1.2.0/angular-touch.js"></script>
} */