var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, audioSchema = require('models/schema/audioSchema');

var audio = mongoose.model('audio', audioSchema , 'items');

exports.addAudio = function(doc,next) {
	doc.authorId = ObjectId(doc.authorId);
	new audio(doc).save(function(err,dbRes){
		return next(err,dbRes);
	});
}