var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');

// Task: app image files
gulp.task('build-images', function() {
	return gulp.src(settings.paths.input.files.images)
	    .pipe(gulp.dest(settings.paths.output.dirs.images))
	    .pipe(browserSync.stream());
});