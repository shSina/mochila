var mongoose = require('mongoose')
	, classSchema = require('models/schema/classSchema')
	, ObjectId = require('mongoose').Types.ObjectId
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
	});//shoud remove from user classes
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
	Class.find({}).exec(function(err,doc){
		return next(err,doc);
	});	
}
exports.addUserToClasses = function(classIds,userId,next){
	if( classIds.length !=0){
		for(var i = classIds.length - 1; i >= 0; i--) {	
			classIds[i] = ObjectId(classIds[i]);
		};
	}
	Class.update({_id:{$in:classIds}},
				{$push:{"studentsIds":userId},
				 $inc : {"studentsCount":1}},
				 {multi:true})
				.exec(function(err,res){
					return next(err,res);
				});
}	
exports.removeUserFromClasses = function(classIds,userId,next){
	if( classIds.length !=0){
		for(var i = classIds.length - 1; i >= 0; i--) {	
			classIds[i] = ObjectId(classIds[i]);
		};
	}
	Class.update({_id: {$in:classIds}},
				 {$pull:{studentsIds:ObjectId(userId)}},
				 {multi:true})
				.exec(function(err){
					next(err);
				})
}
// var Schema = mongoose.Schema
//  	, ObjectId = mongoose.Types.ObjectId;
// Class.find({}).populate('studentsIds').exec(function(err,res){
// 	console.log(res);
// 	// Class.update({_id:res[0]._id},
// 	// 	{$push:{"studentsIds":ObjectId('54992bf43cb5329a16188e18')}}).exec();
// });
