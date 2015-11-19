var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gulpIf = require('gulp-if');

// Task: app javascript stub files
gulp.task('build-js-stubs', function() {

	if (!!settings.paths.input.files.jsStubs) {
	return gulp.src(settings.paths.input.files.jsStubs)
	    .pipe(concat(path.basename(settings.paths.output.files.jsStubs)))
	    .pipe(ngAnnotate({add: true}))
	    .pipe(gulpIf(settings.environment === 'production',uglify({mangle: true})))
	    .pipe(gulp.dest(path.dirname(settings.paths.output.files.jsStubs)))
	} else {
		return;
	}
});