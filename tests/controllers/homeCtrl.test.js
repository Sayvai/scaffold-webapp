describe('homeCtrl -->', function() {

  var controllerName = "Home Controller";

  var $controller;
  var $rootScope;
  var $scope;
  var $q;

  var controller;
  
  var loggingSvcMock;
  var settingsSvcMock;

  beforeEach(module('app', function($provide){
  	
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
        configureLogger: jasmine.createSpy(),
        getLogs: jasmine.createSpy()
    };

    settingsData = {
      "version": "1.0.1",
      "environment": "production",
      "jsStubsAvailable": false
    };

    settingsSvcMock = {
      init: function() {
        return settingsInitMockDeferred.promise;
      },
      getSetting: function(key, defaultValue) {
        var expectedValue;

        if (key === "parentProp.subProp") {
          expectedValue = settingsData.parentProp.subProp; // Special case for this key since there is further object key depth levels to access settings data
        } else {
          expectedValue = settingsData[key];
        }

        if (expectedValue === undefined && defaultValue !== undefined) {
          return defaultValue;
        }

        return expectedValue;
      }
    };

    $provide.value('loggingSvc', loggingSvcMock);
    $provide.value('settingsSvc', settingsSvcMock);
  }));

  beforeEach(inject(function(_$controller_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();
  }));

  beforeEach(function() {
      controller = createController();
    });

  describe('[1] initialise --> ', function() {

    it('[1.1] should call info method off the logging service with a particular string value', function() {
      var message = controllerName + ': Initialising..';
      expect(loggingSvcMock.log.info).toHaveBeenCalledWith(message);
    });

    it('[1.2] should set the controller property \'versionNumber\' with the version value off settings service', function() {
      var message = controllerName + ': Initialising..';
      expect(controller.versionNumber).toEqual(settingsData.version);
    });

  });

  function createController() {	
  	return $controller('homeCtrl', {
  		$scope: $scope,
  		loggingSvc: loggingSvcMock,
      settingsSvc: settingsSvcMock
  	})
  };
});