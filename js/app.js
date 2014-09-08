'use strict'

//module definition
var app = angular.module('app', ['angular-loading-bar']).config(
  [
    'cfpLoadingBarProvider',
    function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }
  ]
);

//overall controll
app.controller('appCtrl', function($scope, $http) {
    $scope.starred = [];
    var apiBase = "https://itunes.apple.com/search?attribute=songTerm&country=JP&media=music&callback=JSON_CALLBACK&term=";
    $scope.search = _.throttle(function() {
      if (!$scope.query) {
        $scope.results = [];
        return;
      }
      var query = apiBase + encodeURIComponent($scope.query);
      $http.jsonp(query).success(function(data) {
        $scope.results = data.results;
        _.forEach($scope.results, function(track) {
          if (_.contains($scope.starred, track.trackId)) {
            track.isStarred = true;
          }
        });
      });
    }, 1000);
    $scope.addStar = function(addId){
      //TODO sync to server.
      $scope.starred.push(addId);
      $scope.starred = _.uniq($scope.starred);
    }
    $scope.removeStar = function(removeId){
      //TODO sync to server.
      _.remove($scope.starred, function(starredId) {
        return starredId == removeId
      });
    }
    $scope.stopAll = function() {
      _.forEach($scope.results, function(result) {
        result.isPlaying = false;
      });
    }
    $scope.isInitialized = function() {
      return !$scope.query && (!$scope.results || !$scope.results.length)
    }
    $scope.getStarredCount = function() {
      //TODO fetch & count starred tracks.
      return $scope.starred.length;
    }
});

//control per track. belongs to appCtrl
app.controller('trackCtrl', function($scope, $http, $sce) {  
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.play = function() {
    this.$parent.stopAll();
    this.$parent.result.isPlaying = true;
  }
  $scope.stop = function() {
    var track = this.$parent.result;
    track.isPlaying = false;
  }
  $scope.star = function() {
    var track = this.$parent.result;    
    this.$parent.addStar(track.trackId);
    //TODO save to server
    track.isStarred = true;
  }
  $scope.unStar = function() {
    var track = this.$parent.result;
    this.$parent.removeStar(track.trackId);
    //TODO remove from server
    this.$parent.result.isStarred = false;
  }
});
