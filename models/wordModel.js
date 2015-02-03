var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, wordSchema = require('models/schema/wordSchema');

var word = mongoose.model('word', postSchema , 'items');

exports.addWord = function(doc,next) {
	doc.authorId = ObjectId(doc.authorId);
	new word(doc).save(function(err,dbRes){
		return next(err,dbRes);
	});
}
exports.updateWordById = function(itemId,userId,doc,next){
	word.update({_id:itemId , authorId : userId},{$set:doc},function(err) {
		return next(err);
	});
}