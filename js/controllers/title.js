'use strict'

angular.module('app').controller('TitleCtrl', function($scope, $location) {
  $scope.path = function() {
    return $location.path().replace('/', '');
  }
});
