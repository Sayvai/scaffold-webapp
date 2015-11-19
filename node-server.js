// load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// send our index.html file to the user for the home page
app.get('*', function(req, res) {
res.sendFile(path.join(__dirname + '/public/index.html'));
});

// start the server
app.listen(1337);
console.log('1337 is the magic port!');