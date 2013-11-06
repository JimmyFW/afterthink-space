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