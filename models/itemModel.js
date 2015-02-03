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
exports.getTodayWords = function(userId , next){
	var nowDate = {year : new Date().getFullYear() , day : new Date().getDate()}
	console.log(nowDate);
	item.aggregate( 
	 {$match:{itemType:'sPost',authorId : userId}}
	,{$project:{body:1 ,year: { $year: "$body.startDate" }, day: { $dayOfYear: "$body.startDate" }}}
	,{$project:{body:1 ,dy : { $subtract: [nowDate.year , "$year"] } , dd : {$subtract :[nowDate.day,"$day"]} } }
	,{$match:{dy:0, dd:{$in:[1,-31,3]}}}
	,{$project:{body:1}}
	,function (err,res) {
		console.log(res);
	});
}