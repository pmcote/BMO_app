var fs = require('fs');
var events = require('events');
var models = require('../models/models');
//var async = require('async'); Add this functionality later.


function octoPartQuery(i, Value, finalCallback){

	if (i < Value.length){

		var octopart = require("octopart");
			octopart.apikey = '4335fcd7';
			
		octopart.parts.search(Value[i], { start:0, limit:10 }).success(function(body) { 
			var url = new models.BOM_data({url: body.results[i].item.offers[0].product_url}); 
			var stock = new models.BOM_data({stock: body.results[i].item.offers[0].in_stock_quantity});
			var price = new models.BOM_data({price: body.results[i].item.offers[0].prices.USD});
			console.log("the shiz nizz");
			console.log(url);
			console.log(stock);
			console.log(price);

			url.save(function(err, docs){
				
				// if (err)
				// 	return console.log('your database is sad')
				// console.log('database is happy1')
			});
				stock.save(function(err, docs1){
					// if (err)
					// 	return console.log('your database is sad')
					// console.log('database is happy2')
			});	
					price.save(function(err, docs2){
						// if (err)
						// 	return console.log('your database is sad')
						// console.log('database is happy3')
						
					
					
			});	
			
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

