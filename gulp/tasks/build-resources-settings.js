var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var args = require('yargs').argv;
var replace = require('gulp-replace');
var gulpIf = require('gulp-if');
var extend = require('gulp-extend');

// Task: compile out app resourses settings.json file
gulp.task('build-resources-settings', function () {

	// Regex to find version number in settings file
	var versionRegex = /\"version\":.*\"/i;

	// Get version number passed in gulp command (e.g. gulp --version 1.0.0)
	version = args.appVersion || version;
	versionOutput = '\"version\": ' + '\"' + version + '\"';
	
	// Check if overriding resources settings.json file exists in environment stub folder
	var defaultResourcesSettingsFilePath = settings.paths.input.files.jsonResourcesSettings;
	var overrideResourcesSettingsFilePath = settings.paths.input.files.jsonResourcesOverrideSettings || '';
	var overrideResourcesSettingsExist = false;

	// Attempt to get any overriding settings.json files (if available)
	try {
		var overrideResourcesSettingsExist = fs.statSync(overrideResourcesSettingsFilePath).isFile();
	} catch(e) {
		console.log('Unable to get overriding resources settings file for \'' + env + '\'. Using default app resources settings only.');
		console.log('Error message: ' + e.message);
	}

	return gulp.src([defaultResourcesSettingsFilePath, overrideResourcesSettingsFilePath])
		.pipe(replace(versionRegex, versionOutput))
		.pipe(gulpIf(!!overrideResourcesSettingsExist, extend(path.basename(defaultResourcesSettingsFilePath))))
		.pipe(gulp.dest(path.dirname(settings.paths.output.files.jsonResources)))
		.pipe(browserSync.stream());
});