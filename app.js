var express = require('express')
	, http = require('http')
    , octopart = require('octopart')
    , Converter = require('csvtojson').core.Converter
    , routes = require('./routes')
    , path = require('path')
    , fs = require('fs')
    , upload = require('./routes/upload')
    , womp = require('./routes/display')
    , mongoose = require('mongoose');

var app = express();


app.configure(function(){
	app.set('port', process.env.PORT || 3000)
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'))
	mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/BOM');
})

app.get('/', routes.index);
app.post('/uploadCSV', upload.upload); 
app.get('/view', womp.view);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//Flow - iter for each break point, Check if break point < stock print

//Referenced sites: 
//For file upload: https://github.com/Tutorialindustry/node.js/tree/master/node.js-file-upload-tutorial
//Octopart-node: https://github.com/octopart/octopart-node
//Csv parsing: https://www.npmjs.org/package/csvtojson

//Shit to do:
//Fix the Mongoose thing
//Add optimization
//Fix all the views and make it look pretty
//Add some Users



