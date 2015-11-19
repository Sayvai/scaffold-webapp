var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

// Task: app styles
gulp.task('build-styles', function() {
  	return gulp.src(settings.paths.input.files.css)
	    .pipe(sass({
	      	'sourcemap=none': true
	    }))
	    .pipe(concat(path.basename(settings.paths.output.files.css)))
	    .pipe(minifyCss({compatibility: 'ie7'}))
	    .pipe(gulp.dest(path.dirname(settings.paths.output.files.css)))
	    .pipe(browserSync.stream())
});