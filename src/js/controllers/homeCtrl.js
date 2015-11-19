(function () {
  'use strict';

  angular
    .module('app')
    .controller('homeCtrl', homeCtrl);

  /* @ngInject */
  function homeCtrl(loggingSvc, settingsSvc) {

    var controllerName = "Home Controller";
    
    var vm = this;
    vm.title = "Home";
    vm.versionNumber = null;

    function initiate() {
      loggingSvc.log.info(controllerName + ': Initialising..');

      vm.versionNumber = settingsSvc.getSetting('version', '0.0.0');
    }

    initiate();
  }

})();
