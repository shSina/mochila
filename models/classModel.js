var mongoose = require('mongoose'), 
    classSchema = require('models/schema/classSchema');

 
var Class = mongoose.model('class', classSchema);

exports.addClass = function(item,next) {
	new Class(item).save(function(err,item){
		return next(err,item);
	});
}
exports.deleteClass = function(id,next) {
	Class.remove({_id : id}).exec(function(err){
		return next(err);
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
		return next(err,docs);
	});
}

exports.addUserToClass = function(classId,userId,next){
	Class.update({_id:classId},
				{$push:{"studentsIds":userId} , $inc : {"studentsCount" : 1}})
				.exec(function(err,res){
					if(err)
						next(err);
				});
}	
// var Schema = mongoose.Schema
//  	, ObjectId = mongoose.Types.ObjectId;
// Class.find({}).populate('studentsIds').exec(function(err,res){
// 	console.log(res);
// 	// Class.update({_id:res[0]._id},
// 	// 	{$push:{"studentsIds":ObjectId('54992bf43cb5329a16188e18')}}).exec();
// });
