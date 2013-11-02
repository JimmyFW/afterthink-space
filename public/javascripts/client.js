var Site = angular.module('Site', ['afterthink.controllers', 'firebase']);

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