var mongoose = require('mongoose')
   	, userSchema = require('models/schema/userSchema')
    , Class = require('./classModel')
    , ObjectId = require('mongoose').Types.ObjectId;
 
var user = mongoose.model('user', userSchema);

exports.addUser = function(item,next) {
	new user(item).save(function(err2,doc){
		if(err2)
			return next(err2,doc);
		Class.addUserToClasses(item.classId,doc._id,function(err1){
			return next(err1,doc);
		})
	});
}

exports.deleteUser = function(id,next) {
	console.log(id);
	user.findOneAndRemove({_id : id}).exec(function(err,doc){
		if(err)
			return next(err);
		console.log(doc);
		Class.removeUserFromClasses(doc.classId,id,function(err){
			next(err);
		});
	});
}

exports.getUserById = function(id,next){ 
	user.findOne({_id : id},function(err,doc){
		return next(err,doc);
	});
}
exports.userExist = function(email,password,next) {
	user.findOne({email :email,password:password})
		.lean()
		.exec(function(err,doc){
			return next(err,doc);
		});
}
exports.updateUser = function(query,item,next){
	user.update(query,{$set:item},function(err,num) {
		if(err)
			next(err);
		// else
		// 	next(num);
	});
}
exports.getAllUsers = function(next) {
	user.find({},function(err,docs) {
		return next(err,docs);
	});
}
exports.getUsersByClassId = function(id,next) {
	user.find({classId:id},function(err,docs) {
		if (err)
			next(err);
		else
			next(docs);
	});
}
exports.removeClassFromUsers = function(classId,userIds,next){
	if( userIds.length !=0){
		for(var i = userIds.length - 1; i >= 0; i--) {	
			userIds[i] = ObjectId(userIds[i]);
		};
	}
	user.update({_id: {$in:userIds}},
				 {$pull:{classId:ObjectId(classId)}},
				 {multi:true})
				.exec(function(err){
					next(err);
				})
}