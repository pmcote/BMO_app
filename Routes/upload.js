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

	   for (var i = 0;i<jsonObj.csvRows.length;i++) {
	   		RefDes.push(jsonObj.csvRows[i].RefDes);
	   		Value.push(jsonObj.csvRows[i].Value);
	   		Type.push(jsonObj.csvRows[i].Type);
	   }
	   console.log(RefDes)
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
    console.log(da_path)
	if ((req.files.myCSV.size/1024 )< maxSizeOfFile){
		msg="File uploaded sucessfully"
	}else{
		msg="File upload failed. File extension not allowed and size must be less than " +maxSizeOfFile;
	}
	res.end(msg); 

	parseCSV(da_path)

	//Pass as a API search endpoint and grab the JSON output
	// octopart.apikey = '4335fcd7';
	// var q = [
	// 	{reference: '1', keyword: RefDes[0].toString() }
	// ];

	// octopart.parts.search(q, {
	// 	exact_only: true,
	//     show: ['uid','mpn','manufacturer']
	// }).success(function(body) {
	//     for(var i=0;i<body.results.length;i++) {
	//         console.log("Result", i, body.results[i].items);
	//     }
	// }).failure(function(err) {
	//     console.log("Honey, I think I broke it. . .", err);
	// });
}; 






