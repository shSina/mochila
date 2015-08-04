var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, imageSchema = require('models/schema/imageSchema');

var image = mongoose.model('image', imageSchema , 'items');

exports.addImage = function(doc,next) {
	doc.authorId = ObjectId(doc.authorId);
	new image(doc).save(function(err,dbRes){
		return next(err,dbRes);
	});
}