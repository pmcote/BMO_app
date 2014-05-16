var mongoose = require('mongoose');

var dataSchema = mongoose.Schema({
	value: String,
	url: String,
	stock: String,
	price:String
})

var BOM_data = mongoose.model('BOM_data', dataSchema);

exports.BOM_data = BOM_data;

//referenced Olin.js hw repos and mongoose documentation