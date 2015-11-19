(function (window) {
	'use strict';

	// Bugfix workaround when including foundation.dynamicRouting modules, initialising global variable
	window.foundationRoutes = [];

	var app = angular.module('app', ['ui.router', 'ngAnimate', 'foundation', 'foundation.dynamicRouting', 'foundation.dynamicRouting.animations']);
	
	/* @ngInject */
	app.run(function(loggingSvc) {
		// Configure the Logging Service
		loggingSvc.configureLogger(loggingSvc.logLevels.trace, 500);
	});
    
    /* @ngInject */
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	  	$stateProvider
	    .state('home', {
	        url: '/home',
	        templateUrl: 'home.html',
	        controller: 'homeCtrl as vm'
	    })
	    .state('log-viewer', {
	        url: '/logs',
	        templateUrl: 'log-viewer.html',
	        controller: 'logViewerCtrl as vm'
	    });
	  
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/home');

		// set our app up to have pretty URLS
		$locationProvider.html5Mode(true);

	});

})(window);