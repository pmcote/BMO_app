var fs = require('fs');
var events = require('events');
var models = require('../models/models');
//var async = require('async'); Add this functionality later.


function octoPartQuery(i, Value, finalCallback){

	if (i < Value.length){ //Value is actually what sort of product we're looking for (ex: 10nF cap), but it's called value on the BOM so. . .

		var octopart = require("octopart");
			octopart.apikey = '4335fcd7';
			
		octopart.parts.search(Value[i], { start:0, limit:10 }).success(function(body) { 
			for (var j=0; j<10; j++){
				for (var k=0; k<body.results[j].item.offers.length; k++){
					var value_data = new models.BOM_data({value: Value[i], url: body.results[j].item.offers[k].product_url, stock: body.results[j].item.offers[k].in_stock_quantity, price: body.results[j].item.offers[k].prices.USD}); 

					console.log("the shiz nizz");

					value_data.save(function(err, value_data){
						
						// if (err)
						// 	return console.log('your database is sad')
						// console.log('database is happy1')
					});
				}
			}
			octoPartQuery(i+1, Value, finalCallback);						
			
		});
	}
	else {
		finalCallback()
	}
}

//Parse CSV for queries (we want the Value and the Type, also Ref)
function parseCSV(path_to_CSV, callback) {
	//Parsing with a library
	var Converter=require("csvtojson").core.Converter;
	var csvFileName=fs.readFileSync(path_to_CSV, 'utf8');
	var csvConverter=new Converter();
	csvConverter.on("end_parsed",function(jsonObj){
		//Parsed arrays
	   var RefDes = [],
	  	   Value = [],
	   	   Type = [];
	   //Will redo the loops more functionally in the next week 
	   for (var i = 0;i<jsonObj.csvRows.length;i++) {
	   		RefDes.push(jsonObj.csvRows[i].RefDes);
	   		Value.push(jsonObj.csvRows[i].Value);
	   		Type.push(jsonObj.csvRows[i].Type);
	   }
	   	//Pass as a API search endpoint and grab output from JSON
	   	
	   	octoPartQuery(0, Value, callback);
	});
	//read from file
	csvConverter.from(csvFileName);
}

exports.upload = function(req, res) {
    var da_path = req.files.myCSV.path;
	parseCSV(da_path, function(){res.redirect('/view')});
}; 

