var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, postSchema = require('models/schema/postSchema');

var post = mongoose.model('post', postSchema , 'items');

exports.addPost = function(doc,next) {
	doc.authorId = ObjectId(doc.authorId);
	new post(doc).save(function(err,dbRes){
		return next(err,dbRes);
	});
}
exports.updatePostById = function(itemId,userId,doc,next){
	post.update({_id:itemId , authorId : userId},{$set:doc},function(err) {
		return next(err);
	});
}