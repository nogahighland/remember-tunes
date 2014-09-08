'use strict'

angular.module('app').controller('TrackCtrl', function($scope, $http, $sce) {  
  _.assign($scope, {
    trustSrc : function(src) {
      return $sce.trustAsResourceUrl(src);
    },
    play : function() {
      this.$parent.stopAll();
      this.$parent.result.isPlaying = true;
    },
    stop : function() {
      var track = this.$parent.result;
      track.isPlaying = false;
    },
    star : function() {
      var track = this.$parent.result;
      this.$parent.addStar(track);
      track.isStarred = true;
    },
    unStar : function() {
      var track = this.$parent.result;
      this.$parent.removeStar(track);
      track.address = '';
      track.isStarred = false;
    }
  });
});
