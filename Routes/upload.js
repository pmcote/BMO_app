var fs = require('fs');
var models = require('../models/models');
var async = require('async');

//Parse CSV for queries (we want the Value and the Type, also Ref)
function parseCSV(path_to_CSV, callback) {
	var Converter=require("csvtojson").core.Converter;
	var csvFileName=fs.readFileSync(path_to_CSV, 'utf8');
	var csvConverter=new Converter();
	csvConverter.on("end_parsed",function(jsonObj){

	   var RefDes = [],
	  	   Value = [],
	   	   Type = [];
	   //Will redo the loops more functionally in the next week 
	   for (var i = 0;i<jsonObj.csvRows.length;i++) {
	   		RefDes.push(jsonObj.csvRows[i].RefDes);
	   		Value.push(jsonObj.csvRows[i].Value);
	   		Type.push(jsonObj.csvRows[i].Type);
	   }
	   	//Pass as a API search endpoint and grab the JSON output
	   	var octopart = require("octopart");
		octopart.apikey = '4335fcd7';
		for (var i = 0;i<Value.length;i++) {
			octopart.parts.search(Value[i], { start:0, limit:10 }).success(function(body) { 
				var url = new models.BOM_data({url: body.results[i].item.offers[0].product_url}); 
				var stock = new models.BOM_data({stock: body.results[i].item.offers[0].in_stock_quantity});
				var price = new models.BOM_data({price: body.results[i].item.offers[0].prices.USD});
				url.save(function(err, docs){
					if (err)
						return console.log('your database is sad')
					console.log('database is happy')
				});
				stock.save(function(err, docs){
					if (err)
						return console.log('your database is sad')
					console.log('database is happy')
				});
				price.save(function(err, docs){
					if (err)
						return console.log('your database is sad')
					console.log('database is happy')
				});
				//ideally store these in a database
				// console.log('Url:', url);
				// console.log('In stock:', stock);
				// console.log('Price for each Break Point:\n', price);
			});
		}
	});
	//read from file
	csvConverter.from(csvFileName);
}

exports.upload = function(req, res) {
	var maxSizeOfFile=100;
	var msg="";
    var da_path = req.files.myCSV.path;
	// res.end(msg);
	async.series([ 
	parseCSV(da_path),
	res.redirect('/view')
	]);
}; 






