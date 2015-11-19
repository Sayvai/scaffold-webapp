var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var nodeServerConfigFilePath = './node-server.js';

// Task: node server
gulp.task('start-server', function () {
	nodemon({
	script: nodeServerConfigFilePath,
	ext: 'js html',
	env: { 'NODE_ENV': 'development' },
	watch: false
	})
});