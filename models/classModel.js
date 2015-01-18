var mongoose = require('mongoose'), 
    classSchema = require('models/schema/classSchema');

 
var Class = mongoose.model('class', classSchema);

exports.addClass = function(item,next) {
	new Class(item).save(function(err,item){
		return next(err,item);
	});
}
exports.deleteClassById = function(id,next) {
	Class.remove({_id : id}).exec(function(err){
		return next(err);
	});
}
exports.updateClassById = function(item,item,next){
	Class.update(item,{$set:item},function(err,num) {
		if(err)
			next(err);
		// else
		// 	next(num);
	});
}
exports.getClassById = function(classId,next){
	Class.findOne({_id : classId}).exec(function(err,doc){
		return next(err,doc);
	});	
}

exports.getAllClasses = function(next) {
	Class.find({}).exec(function(err,docs) {
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
