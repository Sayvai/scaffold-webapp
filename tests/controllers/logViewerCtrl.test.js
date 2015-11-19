describe('logViewerCtrl -->', function() {

  var controllerName = "Log Viewer Controller";

  var $controller;
  var $rootScope;
  var $scope;
  var $q;

  var controller;

  var loggingSvcMock;

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

    $provide.value('loggingSvc', loggingSvcMock);
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

  });

  describe('[2] getLogs --> ', function() {
    var entries = [
      {
          "logged": "2015-11-02T15:50:06.634Z",
          "level": 2,
          "type": "INFO",
          "details": "Logging Service: Initiated"
      },
      {
          "logged": "2015-11-02T15:50:06.669Z",
          "level": 2,
          "type": "INFO",
          "details": "App Controller: Initialising.."
      },
      {
          "logged": "2015-11-02T15:50:06.669Z",
          "level": 2,
          "type": "INFO",
          "details": "SettingsService: Loading settings"
      }
    ];

    it('[2.1] should have called \'getLogs\' method off the logging service', function() {
        loggingSvcMock.getLogs.and.returnValue(entries);
        controller.getLogs();

        expect(loggingSvcMock.getLogs).toHaveBeenCalled();
    });

    it('[2.2] should set controller property \'logEntries\' with correct number of returned items in array', function() {
        loggingSvcMock.getLogs.and.returnValue(entries);
        controller.getLogs();

    	  expect(controller.logEntries.length).toBe(entries.length);
      	expect(controller.logEntries).toEqual(entries);
    });

    it('[2.3] should set controller property \'logEntries\' with an empty array when no items returned', function() {
        loggingSvcMock.getLogs.and.returnValue(null);
        controller.getLogs();

        expect(Array.isArray(controller.logEntries)).toBe(true);
        expect(controller.logEntries.length).toBe(0);
    });

  });

  function createController() {
  	return $controller('logViewerCtrl', {
  		$scope: $scope,
  		loggingSvc: loggingSvcMock
  	})
  };
});