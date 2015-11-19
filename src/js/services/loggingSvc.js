(function () {
  'use strict';

  angular
    .module('app')
    .factory('loggingSvc' , loggingSvc);

  /* @ngInject */
  function loggingSvc($timeout) {

    var serviceName = "Logging Service";

    var service = {};
        service.log = {};
        service.log.trace = logTrace;
        service.log.debug = logDebug;
        service.log.info = logInfo;
        service.log.warn = logWarn;
        service.log.error = logError;
        service.getLogs = getLogs;
        service.registerLogStore = registerLogStore;
        service.configureLogger = configureLogger;
        service.logLevels = {
            trace: 0,
            debug: 1,
            info: 2,
            warn: 3,
            error: 4
        };

        var logLevelLabel = {
            '0': 'TRACE',
            '1': 'DEBUG',
            '2': 'INFO',
            '3': 'WARN',
            '4': 'ERROR'
        };

        var  internal = {};
        internal.logs = [];
        internal.logStores = {};
        internal.logStores.trace = [];
        internal.logStores.debug = [];
        internal.logStores.info = [];
        internal.logStores.warn = [];
        internal.logStores.error = [];
        internal.logLevel = service.logLevels.trace;
        internal.logCount = 0;
        internal.maxLogCount = 500;
        internal.log = log;
        internal.logToConsoleStore = logToConsoleStore;
        internal.publishLogToStores = publishLogToStores;
        internal.publishLogToStore = publishLogToStore;
        internal.registerLogStore = registerLogStore;

        function logInfo(details){
             internal.log(service.logLevels.info, details);
        }

        function logDebug(details){
            internal.log(service.logLevels.debug, details);
        }

        function logTrace(details){
            internal.log(service.logLevels.trace, details);
        }

        function logWarn(details){
            internal.log(service.logLevels.warn, details);
        }

        function logError(details){
            internal.log(service.logLevels.error, details);
        }

        function log(logLevel, details) {

            if (logLevel < internal.logLevel) {
                return;
            }

            var date = new Date();
            var logLabel = logLevelLabel[logLevel];

            var logEntry = {
                'logged' : date,
                'level' : logLevel,
                'type' : logLabel,
                'details' : details
            };

            internal.logs.push(logEntry);

            if(internal.logs.length > internal.maxLogCount){
                internal.logs = internal.logs.splice((internal.logs.length - (internal.maxLogCount)));
            }

            internal.publishLogToStores(logEntry);
        }

        function getLogs(){
            return internal.logs.slice(0);
        }

        function initiate(){

            internal.registerLogStore(service.logLevels.trace, internal.logToConsoleStore);
            internal.registerLogStore(service.logLevels.debug, internal.logToConsoleStore);
            internal.registerLogStore(service.logLevels.info, internal.logToConsoleStore);
            internal.registerLogStore(service.logLevels.warn, internal.logToConsoleStore);
            internal.registerLogStore(service.logLevels.error, internal.logToConsoleStore);

            service.log.info(serviceName + ': Initiated');

        }

        function logToConsoleStore(logEntry){
          var logTypeLabel = logEntry.type.toLowerCase();
          var result = (!!console[logTypeLabel]) ? console[logTypeLabel](logEntry.logged.toISOString() + ' ' + logEntry.type + ' : ' + logEntry.details) : console.log(logEntry.logged.toISOString() + ' ' + logEntry.type + ' : ' + logEntry.details);
        }

        function registerLogStore(logLevel, callback){

            if(logLevel === service.logLevels.trace){
                internal.logStores.trace.push(callback);
            }

            if(logLevel === service.logLevels.debug){
                internal.logStores.debug.push(callback);
            }

            if(logLevel === service.logLevels.info){
                internal.logStores.info.push(callback);
            }

            if(logLevel === service.logLevels.warn){
                internal.logStores.warn.push(callback);
            }

            if(logLevel === service.logLevels.error) {
                internal.logStores.error.push(callback);
            }
        }

        function publishLogToStores(logEntry){
            var logStores = [];
            var logLevel = logEntry.level;

            if(logLevel === service.logLevels.trace){
                logStores = internal.logStores.trace;
            }

            if(logLevel === service.logLevels.debug){
                logStores = internal.logStores.debug;
            }

            if(logLevel === service.logLevels.info){
                logStores = internal.logStores.info;
            }

            if(logLevel === service.logLevels.warn){
                logStores = internal.logStores.warn;
            }

            if(logLevel === service.logLevels.error) {
                logStores = internal.logStores.error;
            }

            for(var i = 0; i < logStores.length; i++){
                publishLogToStore(logStores[i], logEntry);
            }
        }

        function publishLogToStore(logStore, logEntry){
            $timeout(function(){
                logStore(logEntry);
            }, 100);
        }

        function configureLogger(logLevel, numberToStore){
            var configured = false;
            if(logLevel === service.logLevels.trace ||
                logLevel === service.logLevels.debug ||
                logLevel === service.logLevels.info ||
                logLevel === service.logLevels.warn ||
                logLevel === service.logLevels.error
            ){
                internal.logLevel = logLevel;
                configured = true;
            }

            if(numberToStore !== undefined && typeof numberToStore === 'number'){
                internal.maxLogCount = numberToStore;
                configured = true;
            }

            return configured;
        }

        initiate();

        return service;
  }


})();
