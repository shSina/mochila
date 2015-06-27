var mongoose = require('mongoose')
	, classSchema = require('models/schema/classSchema')
	, toObj = require('lib/toObj')
	, user = require('models/userModel');

 
var Class = mongoose.model('class', classSchema);

exports.addClass = function(item,next) {
	new Class(item).save(function(err,dbRes){
		return next(err,dbRes);
	});
}
exports.deleteClassById = function(classId,next) {
	Class.findOneAndRemove({_id : classId}).exec(function(err,doc){
		user.removeClassFromUsers(classId,doc.studentsIds,function(err){
			return next(err);
		});
	});
}
exports.updateClassById = function(classId,item,next){
	Class.update({_id:classId},{$set:item},function(err) {
		return next(err);
	});
}
exports.getClassById = function(classId,next){
	Class.findOne({_id : classId}).exec(function(err,doc){
		return next(err,doc);
	});	
}
exports.getAllClasses = function(next){
	Class.find({},{studentsCount:true,studentsIds:true
					,teacherId:true,startDate:true,className:true})
		 .exec(function(err,doc){
			Class.populate(doc, [{ path: 'studentsIds', select: 'userName' },
								{ path: 'teacherId', select: 'userName' }]
					,function(err,popRes){
					return next(err,popRes);
			});
		 });	
}
exports.addUserToClasses = function(classIds,userId,next){//check user exist
	Class.update({_id:{$in:toObj(classIds)}},
				{$push:{"studentsIds":userId},
				 $inc : {"studentsCount":1}},
				 {multi:true})
				.exec(function(err,res){
					return next(err,res);
				});
}	
exports.removeUserFromClasses = function(classIds,userId,next){
	Class.update({_id: {$in:toObj(classIds)}},
				 {$pull:{studentsIds:toObj(userId)}},
				 {multi:true})
				.exec(function(err){
					next(err);
				})
}
exports.checkExist = function(classIds,next){
	if(!Array.isArray(classIds))
		classIds = [classIds];
	Class.count({_id:{$in:classIds}},function (err, count) {
	  if (err) return next(err);

	  if(classIds.length != count) 
	  	next(new Error('class not exist'));
	  else 
	  	next();
	});
}