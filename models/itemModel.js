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
exports.getTodayWords(ObjectId("54ce2962237dd387126882bb"));

new item({
	authorId : ObjectId("54ce2962237dd387126882bb"),
	authorType : 'st',
	itemType: 'sPost',
	classId : ObjectId("54be676bfa1023a215bd0ccd"),
	body:{
		word : "comer",
		definition : "eat",
		startDate : new Date()
	}
}).save(function(err,dbRes){
		console.log(err+dbRes);
	});