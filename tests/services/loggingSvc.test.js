describe('loggingSvc -->', function() {

  var serviceName = "Logging Service";

  var $rootScope;
  var $httpBackend;
  var $timeout;

  var service;

  beforeEach(module('app', function($provide){
  }));

  beforeEach(inject(function(_loggingSvc_, _$httpBackend_, _$rootScope_, _$timeout_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    service = _loggingSvc_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  beforeEach(function() {
    // Bugfix workaround for unit tests as a result of including foundation.dynamicRouting modules
    $httpBackend.whenGET(/\.html$/).respond();

    $timeout.flush();
  });

  describe('[1] configureLogger --> ', function() {

    it('[1.1] should return \'false\' to indicate logging service configuration is not configured with custom parameters', function() {      
      var result = service.configureLogger();
      expect(result).toBe(false);
    });

    it('[1.2] should return \'true\' to indicate logging service configuration is configured with custom parameters', function() {
      var result = service.configureLogger(service.logLevels.trace, 500);
      expect(result).toBe(true);
    });

  });

  describe('[2] getLogs --> ', function() {

    it('[2.1] should return an object of type Array', function() {      
      var result = service.getLogs();
      expect(Array.isArray(result)).toBe(true);
    });

  });

  describe('[3] log.info --> ', function() {

    it('[3.1] should add an additional log item to the returned array of logs', function() {      
      var logMessage = "Log information message";
      var originalStoredLogs = service.getLogs();
      
      service.log.info(logMessage);

      var updatedStoredLogs = service.getLogs();

      var result = ((originalStoredLogs.length + 1) === updatedStoredLogs.length);

      expect(result).toBe(true);

      var mostRecentLogEntry = updatedStoredLogs.pop();

      expect(mostRecentLogEntry).toEqual(jasmine.objectContaining({
        details: logMessage
      }));
    });

  });

  describe('[4] log.trace --> ', function() {

    it('[4.1] should add an additional log item to the returned array of logs', function() {      
      var logMessage = "Log tracable message";
      var originalStoredLogs = service.getLogs();
      
      service.log.trace(logMessage);

      var updatedStoredLogs = service.getLogs();

      var result = ((originalStoredLogs.length + 1) === updatedStoredLogs.length);

      expect(result).toBe(true);

      var mostRecentLogEntry = updatedStoredLogs.pop();

      expect(mostRecentLogEntry).toEqual(jasmine.objectContaining({
        details: logMessage
      }));
    });

    it('[4.2] should not add an additional log item to the returned array of logs when pre-configured to log at a level above trace level', function() {
      service.configureLogger(service.logLevels.debug, 500);

      var logMessage = "Not logged tracable message";
      var originalStoredLogs = service.getLogs();
      
      service.log.trace(logMessage);

      var updatedStoredLogs = service.getLogs();

      var result = ((originalStoredLogs.length + 1) === updatedStoredLogs.length);

      expect(result).toBe(false);

      var mostRecentLogEntry = updatedStoredLogs.pop();

      expect(mostRecentLogEntry).not.toEqual(jasmine.objectContaining({
        details: logMessage
      }));
    });

    it('[4.3] should not add an additional log item to the returned array of logs and return the most recent cutdown down set of logs when pre-configured to allow log entries to reach given max count', function() {
      var maxCount = 5;
      service.configureLogger(service.logLevels.trace, maxCount); // + 100 hardcoded to theoretically return 150 log entries

      var originalStoredLogs = service.getLogs();
      
      var logMessage;
      for (var i=0;i<(maxCount+1);i++){
        logMessage = "Log tracable message ";
        service.log.trace(logMessage += i);
      };

      var updatedStoredLogs = service.getLogs();

      expect(updatedStoredLogs.length).toBe(maxCount);
    });

  });

  describe('[5] log.debug --> ', function() {

    it('[5.1] should add an additional log item to the returned array of logs', function() {      
      var logMessage = "Log debugging message";
      var originalStoredLogs = service.getLogs();
      
      service.log.debug(logMessage);

      var updatedStoredLogs = service.getLogs();

      var result = ((originalStoredLogs.length + 1) === updatedStoredLogs.length);

      expect(result).toBe(true);

      var mostRecentLogEntry = updatedStoredLogs.pop();

      expect(mostRecentLogEntry).toEqual(jasmine.objectContaining({
        details: logMessage
      }));
    });

  });

  describe('[6] log.warn --> ', function() {

    it('[6.1] should add an additional log item to the returned array of logs', function() {      
      var logMessage = "Log warning message";
      var originalStoredLogs = service.getLogs();
      
      service.log.warn(logMessage);

      var updatedStoredLogs = service.getLogs();

      var result = ((originalStoredLogs.length + 1) === updatedStoredLogs.length);

      expect(result).toBe(true);

      var mostRecentLogEntry = updatedStoredLogs.pop();

      expect(mostRecentLogEntry).toEqual(jasmine.objectContaining({
        details: logMessage
      }));
    });

  });

  describe('[7] log.info --> ', function() {

    it('[7.1] should add an additional log item to the returned array of logs', function() {      
      var logMessage = "Log error message";
      var originalStoredLogs = service.getLogs();
      
      service.log.error(logMessage);

      var updatedStoredLogs = service.getLogs();

      var result = ((originalStoredLogs.length + 1) === updatedStoredLogs.length);

      expect(result).toBe(true);

      var mostRecentLogEntry = updatedStoredLogs.pop();

      expect(mostRecentLogEntry).toEqual(jasmine.objectContaining({
        details: logMessage
      }));
    });

  });

});