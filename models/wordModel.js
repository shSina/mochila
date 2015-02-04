var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, wordSchema = require('models/schema/wordSchema');

var word = mongoose.model('word', wordSchema , 'items');

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
exports.getTodayWords = function(userId , next){

	var now   = new Date(),
		start = new Date(now.getFullYear(), 0, 0),
		diff  = now - start,
		oneDay = 1000 * 60 * 60 * 24,
		nowDate = Math.floor(diff / oneDay);

	userId = ObjectId(userId);

	word.aggregate( 
	 {$match:{authorId : userId}}
	,{$project:{body:1 ,year: { $year: "$body.startDate" }, day: { $dayOfYear: "$body.startDate" }}}
	,{$project:{body:1 ,dy : { $subtract: [now.getFullYear(), "$year"] } , dd : {$subtract :[nowDate,"$day"]} } }
	,{$match:{dy:0, dd:{$in:[1,2,3,7,15]}}}
	,{$project:{body:1}}
	,function (err,res) {
		return next(err,res);
	});
}