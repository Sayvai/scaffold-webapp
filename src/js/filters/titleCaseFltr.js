(function(){
  'use strict';

  angular
    .module('app')
    .filter('titleCase', titleCase);

  /* @ngInject */
  function titleCase () {
    return function(input) {

      if (!!input && typeof input === 'string') {
        var words = input.split(' ');
        for (var i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(' ');
      } else {
        return input;
      }

    };
  }

})();