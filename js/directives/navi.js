'use strict'

angular.module('app').directive('sibs', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        element.parent().children().removeClass('active');
        element.addClass('active');
      })
    },
  }
});