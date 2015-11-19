var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');

// Task: html to js files
gulp.task('build-html-index', function () {

	return gulp.src(settings.paths.input.files.index)
		.pipe(concat(path.basename(settings.paths.output.files.index)))
		.pipe(gulp.dest(path.dirname(settings.paths.output.files.index)))
		.pipe(browserSync.stream());
	
	
});