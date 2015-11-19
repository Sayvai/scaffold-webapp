var gulp = require('gulp');
var path = require('path');
var concat = require('gulp-concat');
var angularTemplateCache = require('gulp-angular-templatecache');

// Task: html to js files
gulp.task('build-html', function () {
	return gulp.src(settings.paths.input.files.views)
		.pipe(angularTemplateCache({module:settings.appModuleName}))
		.pipe(concat(path.basename(settings.paths.output.files.views)))
		.pipe(gulp.dest(path.dirname(settings.paths.output.files.views)))
		.pipe(browserSync.stream());
});