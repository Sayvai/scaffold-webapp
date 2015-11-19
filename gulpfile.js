// Globals, so other externalised tasks can reference these variables
browserSync = require('browser-sync').create();
settings = require('./gulp/settings.json');

// Globals - Defaults
env = "production"; // Overridden when value is passed to --env as gulp parameter
version = "0.0.0"; // Overridden when value is passed to --appVersion as gulp parameter

// Dependencies
var gulp = require('gulp');
var	requireDir = require('require-dir');

// Load custom tasks from separate directory
requireDir('./gulp/tasks', { recurse: true });

// Default task
gulp.task('default', 
	[
		'init',
		'start-server',
		'build-resources-settings',
		'build-images',
		'build-style-libs',
		'build-js-libs',
		'build-styles',
		'build-js',
		'build-js-stubs',
		'build-html-index',
		'build-html',
		'jshint',
		'browser-sync',
		'watch'
	]
);