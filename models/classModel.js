var mongoose = require('mongoose'), 
    classSchema = require('models/schema/classSchema');

 
var Class = mongoose.model('class', classSchema);

exports.addClass = function(item,next) {
	new Class(item).save(function(err){
		if (err)
			next(err);
	});
}
exports.deleteClass = function(id,next) {
	Class.remove({_id : id}).exec(function(err){
		next(err);
	});
}
exports.updateClass = function(query,item,next){
	Class.update(query,{$set:item},function(err,num) {
		if(err)
			next(err);
		// else
		// 	next(num);
	});
}
exports.getAllClasses = function(next) {
	Class.find({},function(err,docs) {
		if (err)
			next(err);
		else
			next(docs);
	});
}