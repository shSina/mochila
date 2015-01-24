var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, itemSchema = require('models/schema/itemSchema');

var item = mongoose.model('item', itemSchema);

exports.addItem = function(doc,next) {
	doc.authorId = ObjectId(doc.authorId);
	new item(doc).save(function(err,dbRes){
		return next(err,dbRes);
	});
}

exports.deleteItemById = function(itemId,userId,next) {
	item.remove({_id : itemId , authorId : userId}).exec(function(err){
		return next(err);
	});
}
exports.updateItemById = function(itemId,userId,doc,next){
	item.update({_id:itemId , authorId : userId},{$set:doc},function(err) {
		return next(err);
	});
}
exports.getItemById = function(itemId,next){
	item.findOne({_id : itemId}).exec(function(err,doc){
		return next(err,doc);
	});	
}
exports.getAllByClassId = function(classId,next){
	item.find({classId : classId})
	.populate('authorId')
	.exec(function(err,doc){
		return next(err,doc);
	});	
}
