describe('versionInformationDir -->', function() {
  var $compile,
      $rootScope,
      $httpBackend;

  var loggingSvcMock,
      settingsSvcMock;

  var settingsData;

  // Load the myApp module, which contains the directive
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

  beforeEach(module('templatesx'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function() {
    // Bugfix workaround for unit tests as a result of including foundation.dynamicRouting modules
    $httpBackend.whenGET(/home.html/).respond();
  });

  it('[1.1] Replaces the element with the appropriate content', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<div><version-information></version-information></div>")($rootScope);
    // fire all the watches, so the scope expression(s) {{ ... } will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("Build: " + settingsData.version);
    expect(element.html().toLowerCase()).toContain(settingsData.environment);
  });
});