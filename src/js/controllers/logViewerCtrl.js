(function () {
  'use strict';

  angular
    .module('app')
    .controller('logViewerCtrl', logViewerCtrl);

  /* @ngInject */
  function logViewerCtrl(loggingSvc) {

    var controllerName = "Log Viewer Controller";
    var vm = this;

    vm.title = "Log Viewer";
    vm.logEntries = [];
    vm.getLogs = getLogs;

    function initiate() {
      loggingSvc.log.info(controllerName + ': Initialising..');
      getLogs();
    }

    function getLogs() {
      vm.logEntries = loggingSvc.getLogs() || [];
    }

    initiate();
  }

})();
