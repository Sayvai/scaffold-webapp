(function () {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', appCtrl);

  /* @ngInject */
  function appCtrl(
    loggingSvc,
    settingsSvc
  ) {

    var controllerName = "App Controller";
    var vm = this;
    vm.configsLoaded = false;

    function initiate() {
      loggingSvc.log.info(controllerName + ': Initialising..');

      settingsSvc.init().then(function(){
        loggingSvc.log.info(controllerName + ": Settings successfully configured. Now including the view.");
        vm.configsLoaded = true;

        vm.environment = settingsSvc.getSetting('environment', 'production');
        vm.versionNumber = settingsSvc.getSetting('version', '0.0.0');
        vm.jsStubsAvailable = settingsSvc.getSetting('jsStubsAvailable', false);
      }, function(error){
        loggingSvc.log.error(controllerName + ": Settings was not successfully configured. Unable to include view. Error message: " + error);
      });
    }

    initiate();
  }

})();
