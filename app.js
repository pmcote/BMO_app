var express = require('express')
    , octo = require('octopart')
    , Converter = require('csvtojson').core.Converter


var app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
})

app.get('/', routes.index)

var server = app.listen(3000)


//Flow - iter for each break point, Check if break point < stock print

//Referenced sites: