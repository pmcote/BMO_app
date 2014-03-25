var fs = require('fs');

//Parse CSV for queries (we want the Value and the Type, also Ref)
function parseCSV(path_to_CSV) {
	var Converter=require("csvtojson").core.Converter;
	var csvFileName=fs.readFileSync(path_to_CSV, 'utf8');
	var csvConverter=new Converter();
	csvConverter.on("end_parsed",function(jsonObj){

	   var RefDes = [];
	   var Value = [];
	   var Type = [];
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
				var url = body.results[i].item.offers[0].product_url; 
				var stock = body.results[i].item.offers[0].in_stock_quantity;
				var price = body.results[i].item.offers[0].prices.USD;
				console.log('Url:', url);
				console.log('In stock:', stock);
				console.log('Price for each Break Point:\n', price);
			});
		}
	});
	//read from file
	csvConverter.from(csvFileName);
}

exports.upload = function(req, res) { 
	//get the file name
	var filename=req.files.myCSV.name;
	var maxSizeOfFile=100;
	var msg="";
    var da_path = req.files.myCSV.path;
	if ((req.files.myCSV.size/1024 )< maxSizeOfFile){
		msg="File uploaded sucessfully, check your console!"
	}else{
		msg="File upload failed. File extension not allowed and size must be less than " +maxSizeOfFile;
	}
	res.end(msg); 

	parseCSV(da_path);
}; 






