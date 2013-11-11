var Site = angular.module('Site', ['afterthink.controllers', 'afterthink.directives', 'firebase']);

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
} */