var mongoose = require('mongoose')
	, userSchema = require('models/schema/userSchema')
	, Class = require('./classModel')
	, toObj = require('lib/toObj')
	, gravatar = require('gravatar');
 
var user = mongoose.model('user', userSchema);

exports.addUser = function(item,next) {
	new user(item).save(function(err2,doc){
		if(err2)
			return next(err2,doc);
		console.log(item.classIds);
		Class.addUserToClasses(item.classIds,doc._id,function(err1){
			return next(err1,doc);
		})
	});
}

exports.deleteUser = function(id,next) {
	// console.log(id);
	user.findOneAndRemove({_id : id}).exec(function(err,doc){
		if(err)
			return next(err);
		console.log(doc.classIds);
		if(doc.classIds.length != 0)
		{
			Class.removeUserFromClasses(doc.classIds,id,function(err){
				next(err);
			});
		}
	});
}

exports.getUserById = function(id,next){ 
	user.findOne({_id : id},function(err,doc){
		return next(err,doc);
	});
}
exports.getMyInfo = function(id,next) {
	user.findOne({_id : id})
	.populate('classIds','className')
	.exec(function(err,doc){
		return next(err,doc);
	});	
}
exports.getUserInfoById = function(userid,finderClassId,next){ 
	user.findOne({_id : userid,classId:{$in:finderClassId}},{'userName':1 ,'imageUrl': 1 },function(err,doc){
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
exports.updateUser = function(id,newUser,next){
	delete newUser._id; // shouldn't update user id
	if(newUser && newUser.classId){
		newUser.classId = toObj(newUser.classId);
	}
	user.findOneAndUpdate({_id:id},{$set:newUser},function(err,doc) {
		return next(err,doc);
	});
}
exports.getAllUsers = function(next) {
	user.find({},{userName:true,type:true,email:true,classIds:true})
		.exec(function(err,doc){
			user.populate(doc,[{ path: 'classIds', select: 'className' }],
				function(err,popRes){
					return next(err,popRes);
			});
		});
}
exports.getTeachers = function(next) {
	user.find({type:'te'},{userName:true,type:true,email:true,classIds:true})
		.exec(function(err,doc){
			user.populate(doc,[{ path: 'classIds', select: 'className' }],
				function(err,popRes){
					return next(err,popRes);
			});
		});
}
exports.getAllFriends = function(id,classIds,next) {
	user.aggregate( 
		{$match:{_id:{$ne:id},classIds:{$in:classIds}}}
		,{$unwind : "$classIds" }
		,{$match:{classIds:{$in:classIds}}}
		,{$group:{_id: "$_id",classIds: { $addToSet: "$classIds" },type:{$first:"$type"},userName:{$first:"$userName"},imageUrl:{$first:"$imageUrl"}}}
		,function (err,res) {
			user.populate(res, [{ path: 'classIds', select: 'className' }]
				,function(err,popRes){
				return next(err,popRes);
			});
		});
}
exports.isFriend = function(reqId,classIds,next) {
	user.count({_id:reqId,classIds:{$in:classIds}},function(err,res){
		return next(err,res);
	});
}
exports.removeClassFromUsers = function(classId,userIds,next){
	if( userIds.length !=0){
		userIds = toObj(userIds);
	}
	user.update({_id: {$in:userIds}},
				 {$pull:{classIds:toObj(classId)}},
				 {multi:true})
				.exec(function(err){
					next(err);
				})
}
exports.getUserStatus = function(id,next){
	user.findOne({_id:id },{'chatStatus':1},function(err,doc) {
		return next(err,doc);
	});
}
exports.checkExist = function(userIds,next){
	if(!Array.isArray(userIds))
		userIds = [userIds];
	user.count({_id:{$in:userIds}},function (err, count) {
	  if (err) return next(err);

	  if(count == 0) 
	  	next(new Error('user not exist'));
	  else 
	  	next();
	});
}
exports.teacherExist = function(userIds,next){
	if(!Array.isArray(userIds))
		userIds = [userIds];
	user.count({_id:{$in:userIds},type:'te'},function (err, count) {
	  if (err) return next(err);

	  if(count == 0)
	  	next(new Error('teacher not exist'));
	  else 
	  	next();
	});
}