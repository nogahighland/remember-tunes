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
    var apiBase = "https://itunes.apple.com/search?attribute=songTerm&country=JP&media=music&callback=JSON_CALLBACK&term=";
    $scope.search = _.throttle(function() {
      if (!$scope.query) {
        $scope.results = [];
        return;
      }
      var query = apiBase + encodeURIComponent($scope.query);
      $http.jsonp(query).success(function(data) {
        //TODO if already starred, set attribute as starred.
        $scope.results = data.results;
      });
    }, 1000);
    $scope.addStar = function(num){
      //TODO sync to server.
      $scope.starred+=num;
    }
    $scope.stopAll = function() {
      angular.forEach($scope.results, function(result) {
        result.isPlaying = false;
      });
    }
    $scope.isInitialized = function() {
      return !$scope.query && (!$scope.results || !$scope.results.length)
    }
    $scope.starred=0; //TODO fetch & count starred tracks.
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
    this.$parent.addStar(1);
    //TODO save to server
    this.$parent.result.isStarred = true;
  }
  $scope.unStar = function() {
    this.$parent.addStar(-1);
    //TODO remove from server
    this.$parent.result.isStarred = false;
  }
});
