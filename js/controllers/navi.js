'use strict'

angular.module('app').controller('AppNaviCtrl', function($scope, $location) {
  _.assign($scope, {
    moveToStarred : function($event) {
      $location.path('/starred');
    },
    moveToSearch : function($event) {
      $location.path('/');
    },
  });
});
