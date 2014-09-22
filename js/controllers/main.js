'use strict'

angular.module('app').controller('MainCtrl', function($scope, $http, $location, storage) {
    $scope.starred = [];
    storage.bind($scope, 'starred', {defaultValue:[]});
    storage.bind($scope, 'results', {defaultValue:{}});
    storage.bind($scope, 'query');
    var apiBase = "https://itunes.apple.com/search?media=music&callback=JSON_CALLBACK&term=";

    _.assign($scope, {
      search : _.throttle(function() {
            if (!$scope.query) {
              $scope.results = [];
              return;
            }
            var query = apiBase + encodeURIComponent($scope.query);
            $http.jsonp(query).success(function(data) {
              $scope.results = data.results;
              var starredIdList = _.collect($scope.starred, function(track) {
                return track.trackId;
              });
              _.forEach($scope.results, function(track) {
                if (_.contains(starredIdList, track.trackId)) {
                  track.isStarred = true;
                }
              });
            });
          }, 1000),
      add : function(addTrack) {
        $scope.starred.push(addTrack);
        $scope.starred = _.uniq($scope.starred, function(track) {
          return track.trackId;
        });
      },
      addStar : function(addTrack) {
        navigator.geolocation.getCurrentPosition(_.bind(function(position) {
          var geo = _.template('http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}', position.coords);
          $http.get(geo).success(_.bind(function(pos) {
            if (pos.status === 'OK') {
              var components = pos.results[0].address_components;
              addTrack.address = _.collect(components.reverse(), function(component) {
                return component.long_name;
              }).splice(1,4).join('');
              addTrack.coords = {
                lat : position.coords.latitude,
                lng : position.coords.longitude
              }
            }
            //TODO sync to server.
            this.add(addTrack);
          }, this));
        }, this));
      },
      removeStar : function(removeTrack){
        //TODO sync to server.
        _.remove($scope.starred, function(track) {
          return track.trackId == removeTrack.trackId;
        });
        var found = _.find($scope.results, function(track) {
          return track.trackId == removeTrack.trackId;
        });
        if (found) {
          found.isStarred = false; found.address = "";
        }
      },
      stopAll : function() {
        _.forEach($scope.results, function(result) {
          result.isPlaying = false;
        });
      },
      isInitialized : function() {
        return !$scope.query && (!$scope.results || !$scope.results.length)
      },
      getStarredCount : function() {
        return $scope.starred.length;
      },
      isSearchView : function() {
        return /^(\/|\/search)$/.test($location.path());;
      },
      getTracks : function() {
        if (/^(\/|\/search)$/.test($location.path())) {
          return $scope.results;
        } else {
          return $scope.starred;
        }
      }
    });
});
