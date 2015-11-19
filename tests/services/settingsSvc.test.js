describe('settingsSvc -->', function() {

  var serviceName = "Settings Service";

  var $rootScope;
  var $httpBackend;
  var $window;
  var $q;
  var $timeout;

  var windowMock;
  var loggingSvcMock;

  var settingsData;
  var versionData;
  var environmentData;

  var service;

  beforeEach(module('app', function($provide){

    windowMock = {
      location: {
        href: "http://localhost:3000/home"
      }
    };

    loggingSvcMock = {
      logLevels: {
          trace: 0,
          debug: 1,
          info: 2,
          warn: 3,
          error: 4
      },
      log: {
        trace: jasmine.createSpy(),
        debug: jasmine.createSpy(),
          info: jasmine.createSpy(),
          warn: jasmine.createSpy(),
          error: jasmine.createSpy()
      },
      configureLogger: jasmine.createSpy()
    };

    $provide.value('$window', windowMock);
    $provide.value('loggingSvc', loggingSvcMock);
  }));

  beforeEach(inject(function(_settingsSvc_, _$rootScope_, _$httpBackend_, _$q_, _$timeout_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    service = _settingsSvc_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    $timeout = _$timeout_;
  }));

  beforeEach(function() {
    // Bugfix workaround for unit tests as a result of including foundation.dynamicRouting modules
    $httpBackend.whenGET(/\.html$/).respond();

    settingsData = {
      "version": '0.0.1',
      "environment": 'production',
      "messages": {
        "errors": {
          "httpRequest": "Request failed",
          "notAuthenticated": "You are not authenticated. Please log in",
          "unknown": "Unknown error",
          "emptyPropertyValue": ""
        }
      }
    };

  });

  function isAPromiseObject(result) {
    if (!!result) {
      if (result.hasOwnProperty("catch") && result.hasOwnProperty("finally") && result.hasOwnProperty("then")) {
        return true;
      }
    }

    return false;
  }

  describe('[1] init -->', function() {
    var originalWindow;

    it('[1.1] should return true when settings data is succssfully returned', function() {      
      $httpBackend.whenGET("/resources/settings.json").respond(settingsData);

      service.init().then(function(response){
        expect(response).toBe(true);
      });

      $httpBackend.flush();
    });

    it('[1.2] should execute the error handler of the promise call with specified error code and error message', function() {
      var errorHttpCode = 404;     
      var errorMessage = 'File not found';
      $httpBackend.whenGET("/resources/settings.json").respond(errorHttpCode, errorMessage);

      service.init().then(function(response){
        // This expectation deliberately fails, but should never reach this point.
        // If it does reach this expectation then something is wrong... check it out
        expect(true).toBeDefined(false);
      }, function(error){
        expect(error.status).toBe(errorHttpCode);
        expect(error.data).toBe(errorMessage);
      });

      $httpBackend.flush();
    });

    it('[1.3] should return true and log a message to indicate settings was already initiated when settings data is succssfully returned', function(done) {

      $httpBackend.whenGET("/resources/settings.json").respond(settingsData);

      service.init().then(function(response){

        service.init().then(function(response){
          expect(response).toBe(true);

          // Calling done will end the test, note, it's passed to this function call
          done();
        });

        expect(loggingSvcMock.log.warn).toHaveBeenCalledWith(serviceName + ": Initialised called more than once.");
      });

      $httpBackend.flush();
      $timeout.flush();
    });

  });

  describe('[2] getSetting (with settings successfully loaded) -->', function() {

    beforeEach(function(done){

      $httpBackend.whenGET("/resources/settings.json").respond(settingsData);
      service.init().then(function(){
        done();
      }, function(error){
        // It should not reach here. If it does then test will eventually fail as done() will not have been called.
      });
      $httpBackend.flush();

    });

    it('[2.1] should return loaded mock settings data values', function() {      

      var version = service.getSetting('version', '0.0.0');
      expect(version).toBe(settingsData.version);

      var environment = service.getSetting('environment', 'development');
      expect(environment).toBe(settingsData.environment);

      var errors = service.getSetting('messages.errors', null);
      expect(errors.httpRequest).toBe(settingsData.messages.errors.httpRequest);
      expect(errors.notAuthenticated).toBe(settingsData.messages.errors.notAuthenticated);
      expect(errors.unknown).toBe(settingsData.messages.errors.unknown);

    });

    it('[2.2] should return default values when invalid ids are passed', function() {      

      var defaultValue = '0.0.0';

      var resultOne = service.getSetting('', defaultValue);
      expect(resultOne).toBe(defaultValue);

      var resultTwo = service.getSetting(null, defaultValue);
      expect(resultTwo).toBe(defaultValue);

    });

    it('[2.3] should return default value if last setting property is not found', function() {      

      var defaultValue = 'someDefaultValue';

      var result = service.getSetting('messages.errors.notExist', defaultValue);
      expect(result).toBe(defaultValue);

    });

    it('[2.4] should return default value traversed setting property is not found', function() {      

      var defaultValue = 'someDefaultValue';

      var result = service.getSetting('messages.errorsBAD.notAuthenticated', defaultValue);
      expect(result).toBe(defaultValue);

    });

  });

  describe('[3] getSetting (with settings not successfully loaded) -->', function() {

    beforeEach(function(done){

      $httpBackend.whenGET("/resources/settings.json").respond(404, 'File not found');
      service.init().then(function(){
        // It should not reach here. If it does then test will eventually fail as done() will not have been called.
      }, function(error){
        done();
      });
      $httpBackend.flush();

    });

    it('[3.1] should log a message indicating settings not loaded', function() {      
      var id = 'version';
      var defaultValue = '0.0.0';

      var version = service.getSetting(id, defaultValue);

      var logWarningMessage = serviceName + ': getSetting called with id: ' + id + ' but settings have not been loaded yet. Returning default if specified:' + defaultValue;

      expect(loggingSvcMock.log.warn).toHaveBeenCalledWith(logWarningMessage);
      expect(version).toBe(defaultValue);

    });

  });

});