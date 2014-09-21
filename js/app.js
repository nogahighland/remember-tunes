'use strict'

var app = angular.module('app', ['angular-loading-bar', 'ngRoute', 'angularLocalStorage'])
app.config([
  'cfpLoadingBarProvider',
  function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }
]);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/app.html',
    })
    .when('/search', {
      templateUrl: 'views/app.html',
    })
    .when('/starred', {
      templateUrl: 'views/app.html',
    });
});
app.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
});
