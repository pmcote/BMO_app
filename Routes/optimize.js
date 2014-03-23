//Parse BOM, make quiries of the API, sort data for 
//break point/inventory >> display

//Parse CSV for queries (we want the Value and the Type)
//var csv is the CSV file with headers
var fs = require('fs')
//Converter Class
var Converter=require("csvtojson").core.Converter;

//CSV File Path or CSV String or Readable Stream Object
var csvFileName=fs.readFileSync('./test-bom.csv', 'utf8');

//new converter instance
var csvConverter=new Converter();

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
   console.log(jsonObj); //here is your result json object
   console.log(jsonObj.csvRows[0].Value) 
   console.log(jsonObj.csvRows.length)

   var RefDes = [];
   var Value = [];
   var Type = [];

   for (var i = 0;i<jsonObj.csvRows.length;i++) {
   		RefDes.push(jsonObj.csvRows[i].RefDes)
   		Value.push(jsonObj.csvRows[i].Value)
   		Type.push(jsonObj.csvRows[i].Type)
   		console.log(RefDes, Value, Type)
   }
});

//read from file
csvConverter.from(csvFileName);



//Pass as a API search endpoint and grab the JSON output


//Analysis on the JSON to pull out the cheapest entry's
//part listing, price(for each bp), and a link to buy.

//export that data to display 
