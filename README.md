#Scaffold-Webapp

**A skeletal front-end development workflow setup that allows developers to compile a web application to multiple build types** (i.e. development, production, etc...) according to a developers' requirements. This is especially useful when running applications under different environments. For example a development build can be configured and compiled, to make requests to a test / development sever thereby returning constrained data, whereas a production build is compiled and configured to point requests to the production server, returning  limitless unconstrained real data. This is a very configurable setup (see Usage section).

When compiling and building the app source files (**./src/**), the compiled distributable / hostable application files are written to the 'public' directory (**./public/**).

Gulp tasks are defined in the 'tasks' directory with 'gulp' directory (**./gulp/tasks**), with the main default 'production' gulp settings file (for mainly path references used by gulp tasks) defined in **./gulp/settings.json** (see Creating New Build Types for example usage for usage example in build types context)

This front-end workflow project combines the following web and development technology stack:

* [Foundation for Apps@1.1.0](http://foundation.zurb.com/apps/docs/) (Zurb) - Responsive grid-based UI framework.
* [AngularJS@1.3.20](https://angularjs.org/) - JavaScript MVC framework.
* [NodeJS@4.2.1](https://nodejs.org/) - JavaScript runtime. Used to include npm modules and run local server to host web application.
* [Gulp@3.9.0](http://gulpjs.com/) - JavaScript taskrunner used to build / compile the application source code into a distributable directory. Also used to assist in starting up a local node server.
* [Bower@1.6.5](http://bower.io/) - JavaScript front-end package manager which manages all the applications' release dependencies.

###Scripts
The JavaScript source files are defined inside the 'js' directory (./src/js). This simply contains the main JavaScript file 'default.js' along with AngularJS Services and Controllers. This is where you may defined additional JavaScript files (i.e. controllers, services, directives, filters, etc...). When compiled the source files are concatenated and minified to 'app.js' inside the distributable directory (./public/js/app.js)

###Gulp
This project uses Gulp as the JavaScript task runner, and is configured in a way that the tasks are broken down into its own individual files and externalised into a sub-directory (./gulp/tasks). From there you can create and find each Gulp task definition. You can run the Gulp tasks in the main gulp file (./gulp/gulpfile.js)

###SASS
Generally, in this project, a convention is followed that each view (html) has its own dedicated SASS (.scss) file (located in .src/styles/), prefixed with an underscore (_). When defining new individual view styles, it is best to import the additional scss files into the main default.scss file (./src/styles/defailt.scss). When compiled the source style files are concatenated to 'style.css' inside the distributable directory (./public/styles/style.css)

###Views
Views are tranformed and compiled into JavaScript, and loaded into the template cache for quick retrieval. You can still write your views in HTML, and when compiled, the templates will output to templates.js inside the distributable directory (./public/js/templates.js), which is then reference inside main index.html file (./public/index.html)

###Unit Tests
Sample unit tests are also included using [**Karma**](http://karma-runner.github.io/) as the test runner / server, and [**Jasmine**](http://jasmine.github.io/) as the test framework. Unit tests in this project are written in the tests directory (**./tests/**)

### Unit Test Coverage
The project also produces unit test coverage using [Istanbul](https://github.com/gotwarlost/istanbul) which is already included as the node module included in this project; [karma-coverage](https://github.com/karma-runner/karma-coverage).

To see the user-friendly coverage report, the project needs to be setup first (see Installation / Setup), and then run the terminal command `gulp test`, and then once the unit tests have completed running, a folder in the root of the project is created, allowing you to see the coverage report in **./reports/coverage/report-html/index.html**.

**Note**: Coverage report is not written to when running unit tests in debug mode `gulp test --debug`

Below is how the unit test coverage report would look when opened in a browser.

![Alt text](/../screenshots/screenshots/UnitTestCoverageReport.png?raw=true "Optional Title")

### JS Hint
JS Hint is also included in this project for detect errors or potential errors with JavaScript code. This project uses the [gulp-jshint](https://www.npmjs.com/package/gulp-jshint) node module.

#Installation Setup

## Install Global Node Dependencies
Download and install [Git](https://git-scm.com/).

Download and install [NodeJS](https://nodejs.org/), this also includes its own Node Package Manger (NPM). **Note**: This setup was tested against NodeJS version 4.2.1

Once NodeJS is downloaded, install the following NodeJS modules globally on your system. **Note**: You may need to prefix the following `npm` commands with `sudo` to overcome permissions issues.

**Nodemon**

```
npm install -g nodemon
```

**Bower**

```
npm install -g bower
```

**Gulp**

```
npm install -g gulp
```

**Karma-CLI**

```
npm install -g karma-cli
```

#### Not recommended to install the below modules globally

Only install if karma complains it cannot find modules / plugins locally to project.

Karma

```
npm install -g karma
```

Jasmine-Core

```
npm install -g jasmine-core
```

Karma-Jasmine

```
npm install -g karma-jasmine
```

Karma-Coverage

```
npm install -g karma-coverage
```

Karma-Chrome-Launcher

```
npm install -g karma-chrome-launcher
```

Karma-PhantomJS-Launcher

```
npm install -g karma-phantomjs-launcher
```

## Clone Project

In your terminal enter either of the following commands to clone this project. Use either http or ssh protocol, whichever is your preferred method.

clone via **http**:

```
git clone https://github.com/Sayvai/scaffold-webapp.git
```

or

clone via **ssh**:

```
git clone ssh://git@github.com:Sayvai/scaffold-webapp.git
```

## Install Local Project Dependencies

You will firstly need to install all the node module dependencies this project requires. So run this command. **Note**: You may need to prefix the following `npm` commands with `sudo` to overcome permissions issues.

```
npm install
```

Next, install all the front-end bower dependencies this application requires for to compile to production code.

```
bower install
```

#USAGE
##Commands
Now the project is ready to be run.

You may run the given gulp command to compile to 'production' build (default is 'production' if --env parameter is not passed or invalid environment build type entered) with a specific version number passed (default is '0.0.0' if --appVersion parameter is not passed):

```
gulp --env 'production' --appVersion '0.0.2'
```

You may run the given gulp command to compile to 'development' build with a specific version number passed:

```
gulp --env 'development' --appVersion '0.0.1'
```

You can run unit test as a single run as a standalone. This will run the test against PhantomJS once:

```
gulp test
```

You can run the unit test in **debug** mode, which launches by default only the Chrome browser and runs the test against the launched browser(s) (Chrome needs to be installed, or you can configure and install other browser launchers in Karma. See [Karma browsers docs](http://karma-runner.github.io/0.13/config/browsers.html))

```
gulp test --debug
```

##Configurability
For each build you may apply different front-end settings data configurables to the builds' settings file(s).

The default build is configured to be 'production', so the 'production' builds' settings file will the the main file located **'./src/resources/settings.json'**.

If you would like to provide different overriding app settings data cofiguration to 'development' build, then you may specify 'development' configuration specific data to its own settings file located in **'./src/stubs/development/resources/settings.json'**. So when 'development' build is compiled, this will merge / override settings data over the default 'production' settings data.

You can also not just only modify the front-end app settings config data file, but also add **overriding images** with the same filename which will overwrite the default images set for 'production' when building to other non-production build types (i.e. development). Same practise goes for **overriding (S)CSS styles** or **overriding JavaScript objects in the global namespace or decorate angular services** (i.e. for mocking objects / stubs) too, again for non-production build types. This all depends on correctly configuring the 'gulp' settings file(s) for your build type to point to correct build type (stub) path for the gulp tasks to reference to.

If there are other custom build types (i.e. other than 'production' or 'development'), then the same instructions would apply to these also. See 'Creating New Build Type' section.

#Creating New Build Types (example)
If you wanted to add an additional build type, say for example 'demo', then I would copy the directory **'development'** (located in **./gulp/development/**) and paste this directory inside **./gulp/**, and renaming this directory to **demo**, leaving you with an additional directory inside the 'gulp' directory named 'demo'.

Now modify the gulp settings file for your new 'demo' build type (for example **./gulp/demo/settings.json**) and modify the paths accordingly, typically replacing string references from 'development' to 'demo' in directory/file paths.

Next copy the 'development' directory on the front-end codebase (**./src/stubs/development**) to the same 'stubs' directory, this time renaming the copied directory to 'demo'. Here you may go into the 'demo' directory and modify the settings file (**./src/stubs/demo/resources/settings.json**) JSON property 'environment' value, replacing 'development' with 'demo'.

Now you may compile the web application to 'demo' build by running the following command:

```
gulp --env 'demo' --appVersion '0.0.3'
```

#Directories / Files to ignore (VCS)
The following directories / files are ignored:

* bower_components/
* node_modules/
* public/
* reports/

Also recommend that you ignore files which are automatically added by your working IDEs (i.e. .idea/ for WebStorm, etc)