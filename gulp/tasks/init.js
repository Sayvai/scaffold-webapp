var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var args = require('yargs').argv;
var objectMerge = require('object-merge');

var deleteFolderRecursive = function(dirPath) {
  if( fs.existsSync(dirPath) ) {
    fs.readdirSync(dirPath).forEach(function(file,index){
      var curPath = path.join(dirPath,file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

gulp.task('init', function() {
	console.log((!!args.env ? 'Environment passed is: \''+ args.env + '\'' : 'No environment passed. Using default environment: ' + env));

	console.log('Removing directory \'' + settings.paths.output.dirs.app + '\'')
	deleteFolderRecursive(settings.paths.output.dirs.app);

	var specifiedEnv = args.env;

	var customSettingsFilePath = './gulp/' + specifiedEnv + '/settings.json';
	var customSettingsFilePathRelative = '../' + specifiedEnv + '/settings.json';
	console.log('Looking for custom gulp settings in path: \'' + customSettingsFilePath + '\'')

	var customSettings = null;

	// Get and merge custom settings with default settings
	try {
		var customSettingsExist = fs.statSync(customSettingsFilePath).isFile();

		if (!!customSettingsExist) {
			console.log('Custom gulp settings found for \''+ specifiedEnv +'\' environment. Merging custom settings with default settings');

		    customSettings = require(customSettingsFilePathRelative);
		    settings = objectMerge(settings, customSettings);

		}
	} catch(e) {
		console.log('ERROR --> ' + e.message);
		console.log('Cannot find environment folder (or custom settings) for \''+ specifiedEnv +'\'. Using default settings only');
		console.log('Environment is set by default to \''+ env +'\'');
	}
});