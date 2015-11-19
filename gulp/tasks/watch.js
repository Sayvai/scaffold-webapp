var gulp = require('gulp');

// Task: watch
gulp.task('watch', function() {
    gulp.watch(settings.paths.input.files.css, ['build-styles']);
    gulp.watch(settings.paths.input.files.js, ['test', 'jshint', 'build-js']);
    gulp.watch(settings.paths.input.files.images, ['build-images']);
    gulp.watch([settings.paths.input.files.views, settings.paths.input.files.index], ['build-html']);
    gulp.watch(settings.paths.input.files.jsonResources, ['build-resources-settings']);
    gulp.watch(settings.paths.input.files.index, ['build-html-index']);
});