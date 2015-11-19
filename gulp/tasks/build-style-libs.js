var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var concat = require('gulp-concat');

// Task: app style libraries
gulp.task('build-style-libs', function() {
  	return gulp.src(settings.paths.input.files.cssLibs)
	    .pipe(sass({
	      	'sourcemap=none': true
	    }))
	    .pipe(concat(path.basename(settings.paths.output.files.cssLibs)))
	    .pipe(gulp.dest(path.dirname(settings.paths.output.files.cssLibs)))
});