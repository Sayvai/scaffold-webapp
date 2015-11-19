var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

// Task: jshint
gulp.task('jshint', function() {
	return gulp.src(settings.paths.input.files.js)
	    .pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'))
});