var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');

// Task: app javascript libraries
gulp.task('build-js-libs', function() {
	return gulp.src(settings.paths.input.files.jsLibs)
	    .pipe(concat(path.basename(settings.paths.output.files.jsLibs)))
	    .pipe(gulp.dest(path.dirname(settings.paths.output.files.jsLibs)))
});