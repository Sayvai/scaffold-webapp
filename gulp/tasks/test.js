var gulp = require('gulp');
var path = require('path');
var args = require('yargs').argv;
var appRoot = require('app-root-path');
var karmaServer = require('karma').Server;
var shell = require('gulp-shell');
var spawn = require('child_process').spawn;

var debugMode = args.debug;
var testConfigFileName = 'karma.conf.js';

if (!!debugMode) {
	console.log('Test mode is set to debug mode. Loading debug test config.');
	testConfigFileName = 'karma.conf.debug.js';
}

/**
 * Run test once and exit
 */

/*gulp.task('test', shell.task([
    'karma start ' + testConfigFileName
], {ignoreErrors: true, stdio: 'inherit', cwd: appRoot}));*/

gulp.task('test', function (callback) {
	var ls = spawn('karma', ['start', testConfigFileName], {stdio: 'inherit',cwd: appRoot});

	ls.on('close', function (code) {
		console.log('child process exited with code ' + code);
		
		// Will 'Finish' this task properly.
		// If not called, gulp cannot register this as finished, 
		// and so will not re-run task when called again in same session
		callback();
	});
});