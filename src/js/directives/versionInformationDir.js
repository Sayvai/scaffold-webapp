(function(){
  'use strict';

  angular
    .module('app')
    .directive('versionInformation', versionInformation);

     /**
     * @name versionInformation
     * @desc <version-information> Directive
     */
     /* ngInject */
    function versionInformation() {
      /*jshint validthis: true */
      /**
       * @name versionInformationCtrl
       * @desc Version Information Controller
       * @type {Function}
       */
      function versionInformationCtrl(settingsSvc) {

        /**
         * @name appVersion
         * @desc Contains the primary version number of this app
         * @type {String}
         */

          var appVersion  = settingsSvc.getSetting("version", "0.0.0");
          var appEnvironment = settingsSvc.getSetting("environment", "Unknown");
          var vm = this;
          vm.appVersion = appVersion;
          vm.appEnvironment = appEnvironment;
      }

      ///**
      // * @name link
      // * @desc Version Information Link
      // * @type {Function}
      // */
      //function link($scope, $element, $attrs, $ctrl) {
      //  // if you ever need to directly modify the dom then you can do it here instead of the controller
      //}

      return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: 'version-information.html',
        controllerAs: 'vm',
        controller: versionInformationCtrl
        //link: link
      };

    }

})();