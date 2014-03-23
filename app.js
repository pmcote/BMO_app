var express = require('express')
	, http = require('http')
    , octo = require('octopart')
    , Converter = require('csvtojson').core.Converter
    , routes = require('./routes')
    , path = require('path')
    , fs = require('fs')



var app = express();


app.configure(function(){
	app.set('port', process.env.PORT || 3000)
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'))
})

app.get('/', routes.index)
app.post('/uploadCSV', function (req, res) { 
	//get the file name
	console.log(req.files)
	var filename=req.files.myCSV.name;
	var maxSizeOfFile=100;
	var msg="";

	// get the temporary location of the file
    var tmp_path = req.files.myCSV.path;
    
	// set where the file should actually exists - in this case it is in the "images" directory
    var target_path = __dirname +'/upload/' + req.files.myCSV.name;

	if ((req.files.myCSV.size /1024 )< maxSizeOfFile){
		fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
			fs.unlink(tmp_path, function() {
				if (err) throw err; 
			});
		});
		msg="File uploaded sucessfully"
	}else{
	// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		fs.unlink(tmp_path, function(err) {
            if (err) throw err; 
        });
		msg="File upload failed.File extension not allowed and size must be less than "+maxSizeOfFile;
	}
	 res.end(msg);                                      
});   

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//Flow - iter for each break point, Check if break point < stock print

//Referenced sites: 
//For file upload, after failing with like 100 other methods https://github.com/Tutorialindustry/node.js/tree/master/node.js-file-upload-tutorial



