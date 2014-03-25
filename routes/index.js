//Code on homepage, give info to action script
var models = require('../models/models');
exports.index = function (req, res){
	models.BOM_data.collection.remove({}, function(err) { 
   		console.log('collection removed') 
	});
	res.render('index', {title: 'BMO_app'});
}

