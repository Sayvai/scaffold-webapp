var gulp = require('gulp');

// Task: Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
    	browser: "google chrome",
        proxy: "localhost:1337"
    });
});