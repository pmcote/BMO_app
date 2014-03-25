var models = require('../models/models');

exports.view = function(req, res){
	var BOM_info = models.BOM_data.find({}, function(err, docs){
		if (err)
			return console.log('poop');
		console.log('yay');
		console.log(docs);
		res.render('view', {title: 'BMO_app', BOM_info: docs});
	})
};