describe('appCtrl -->', function() {

  var controllerName = "App Controller";

  var $controller;
  var $rootScope;
  var $scope;
  var $q;

  var controller;
  
  var loggingSvcMock;
  var settingsSvcMock;

  var settingsInitMockDeferred;

  var settingsData;

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
        configureLogger: jasmine.createSpy()
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

  beforeEach(inject(function(_$controller_, _$rootScope_, _$q_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $q = _$q_;

    settingsInitMockDeferred = $q.defer();

    $scope = $rootScope.$new();
  }));

  describe('[1] initialise successfully --> ', function() {

    beforeEach(function() {
      controller = createController();

      settingsInitMockDeferred.resolve(true);
      $scope.$digest();
    });

    it('[1.1] should set configsLoaded property to true', function() {
      expect(controller.configsLoaded).toBe(true);
    });

    it('[1.2] should set environment property to correct environment string', function() {
      expect(controller.environment).toEqual(settingsData.environment);
    });

    it('[1.3] should set jsStubsAvailable property to correctly configured boolean value for stubs', function() {
      expect(controller.jsStubsAvailable).toEqual(settingsData.jsStubsAvailable);
    });   

  });

  describe('[2] initialise unsuccessfully --> ', function() {
  	var error = false;

    beforeEach(function() {
      controller = createController();

      settingsInitMockDeferred.reject(error);
      $scope.$digest();
    });

    it('[2.1] should call error method off logging service', function() {
    	var message = controllerName + ": Settings was not successfully configured. Unable to include view. Error message: " + error;
      	expect(loggingSvcMock.log.error).toHaveBeenCalledWith(message);
    }); 

  });

  function createController() {	
  	return $controller('appCtrl', {
  		$scope: $scope,
  		loggingSvc: loggingSvcMock,
    	settingsSvc: settingsSvcMock
  	})
  };
});