var express = require('express')
    , octo = require('octopart')
    , Converter = require('csvtojson').core.Converter
    , routes = require('./routes')
    , path = require('path')
    , fs = require('fs')



var app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'))
})

app.get('/', routes.index)
app.get('/uploadCSV', function (req , res) {
	console.log('File name is' + req.files.myCSV.name);
})

var server = app.listen(3000)


//Flow - iter for each break point, Check if break point < stock print

//Referenced sites: http://howtonode.org/really-simple-file-uploads