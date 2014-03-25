var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/BOM');

var dataSchema = mongoose.Schema({
	url: String,
	stock: String,
	price:String
})

var BOM_data = mongoose.model('BOM_data', dataSchema);

exports.BOM_data = BOM_data;

//referenced Olin.js hw repos and mongoose documentation