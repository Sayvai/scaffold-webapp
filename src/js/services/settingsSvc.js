(function () {
  'use strict';

  angular
    .module('app')
    .factory('settingsSvc' , settingsSvc);

  /* @ngInject */
    function settingsSvc(
        loggingSvc,
        $http,
        $window,
        $q,
        $timeout
    ) {
        var serviceName = "Settings Service";

        var service = {};
        var internal = {};

        internal.settings = {};
        internal.initialised = false;
        internal.settingsLoaded = false;
        internal.getAppRootUrl = getAppRootUrl;

        service.getSetting = getSetting;
        service.init = init;
        service.appRootUrl = "";

        function getSetting(id, defaultValue){

            if(id === undefined || id === null || id === "" || id === ''){

                loggingSvc.log.warn(serviceName + ': getSetting called without passing an id');

                return defaultValue;
            }

            if(!internal.settingsLoaded) {
                loggingSvc.log.warn(serviceName + ': getSetting called with id: ' + id + ' but settings have not been loaded yet. Returning default if specified:' + defaultValue);
                return defaultValue;
            }

            var path = id.split('.');

            var pathTraversed = "";
            var foundValue;

            for(var i = 0; i < path.length; i++){

                if(i === 0){
                    foundValue = internal.settings[path[0]];
                    pathTraversed += path[i];
                    continue;
                }

                if(foundValue instanceof Object){
                    foundValue = foundValue[path[i]];
                } else {
                    loggingSvc.log.error(serviceName + ': tried to get setting ' + path[i] + ' but the setting was not found. The path traversed was: ' + pathTraversed);
                    foundValue = defaultValue;
                }

                pathTraversed += '.' + path[i];
            }

            if(foundValue === undefined || foundValue === null){
                return defaultValue;
            }
            
            return foundValue;
        }

        function loadSettings(){

            service.appRootUrl = internal.getAppRootUrl();
            loggingSvc.log.info(serviceName + ": Root url: \'" + service.appRootUrl + "\'");

            var path = service.appRootUrl + 'resources/settings.json';

            return $http.get(path).then(function(response) {
                internal.settings = response.data;
                internal.settingsLoaded = true;
                loggingSvc.log.info(serviceName + ': Settings Loaded');
                return true;

            }, function(response){
                loggingSvc.log.error(serviceName + ': An error occurred while trying to load the settings for the application. Unable to find the path: ' + path + ' error: ' + JSON.stringify(response));
                return $q.reject(response);
            });
        }

        function init(){

            var deferred = $q.defer();

            if(internal.initialised){
                loggingSvc.log.warn(serviceName + ": Initialised called more than once.");
                $timeout(function(){
                    deferred.resolve(true);
                }, 0);
                return deferred.promise;
            }
            loggingSvc.log.info(serviceName + ': init called');
            internal.initialised = true;
            loggingSvc.log.info(serviceName + ': Loading settings');
            return loadSettings();
        }

        function getAppRootUrl(){

            var currentUrl = $window.location.href;
            loggingSvc.log.info(serviceName + ": current url: " + currentUrl);

            var index = currentUrl.lastIndexOf("index.html");

            if(index === -1){
                loggingSvc.log.info(serviceName + ": did not find index page checking for hashtag");
                //check for hashtag
                index = currentUrl.lastIndexOf("#/");

                if(index === -1){
                    loggingSvc.log.info(serviceName + ": did not find hashtag checking for app path");

                    // possibly using pushstate then find the app/ in path
                    index = currentUrl.lastIndexOf("app/");

                    if(index === -1){
                        loggingSvc.log.info(serviceName + ": did not find \'app/\' checking for app path");

                        // possibly using pushstate then find the home in path
                        index = currentUrl.lastIndexOf("home");
                    }                     
                }
            }

            var root = "/";

            if(index !== -1){
                root = currentUrl.replace(currentUrl.substr(index), "");
            }

            if(root.indexOf('http') !== -1){
                loggingSvc.log.info(serviceName + ": \'http\' found in path, so setting root path as \'/\'");
                // served by a web server so root path is fine
                root = "/";
            }

            return root;
        }

        return service;
    }


})();
