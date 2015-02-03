var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, itemSchema = require('models/schema/itemSchema')
	, wordSchema = require('models/schema/wordSchema');

var item = mongoose.model('item', itemSchema , 'items');

exports.deleteItemById = function(itemId,userId,next) {
	item.remove({_id : itemId , authorId : userId}).exec(function(err){
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