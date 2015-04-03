var mongoose = require('mongoose')
	, userSchema = require('models/schema/userSchema')
	, Class = require('./classModel')
	, ObjectId = require('mongoose').Types.ObjectId
	, gravatar = require('gravatar');
 
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
	// console.log(id);
	user.findOneAndRemove({_id : id}).exec(function(err,doc){
		if(err)
			return next(err);
		// console.log(doc);
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
exports.getMyInfo = function(id,next) {
	user.findOne({_id : id})
	.populate('classId','className')
	.exec(function(err,doc){
		return next(err,doc);
	});	
}
exports.getUserInfoById = function(id,userClassId,reqId,next){ 
	if(id == reqId){
		user.findOne({_id : reqId},function(err,doc){
			return next(err,doc);
		});
	}
	else{
		user.findOne({_id : reqId,classId:{$in:userClassId}},{'userName':1 ,'imageUrl': 1 },function(err,doc){
			return next(err,doc);
		});
	}

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
		//  next(num);
	});
}
exports.getAllUsers = function(next) {
	user.find({},function(err,docs) {
		return next(err,docs);
	});
}
exports.getAllFriends = function(id,classIds,next) {
	user.aggregate( 
		{$match:{_id:{$ne:id},classId:{$in:classIds}}}
		,{$unwind : "$classId" }
		,{$match:{classId:{$in:classIds}}}
		,{$group:{_id: "$_id",classId: { $addToSet: "$classId" },type:{$first:"$type"},userName:{$first:"$userName"},imageUrl:{$first:"$imageUrl"}}}
		,function (err,res) {
			user.populate(res, [{ path: 'classId', select: 'className' }]
				,function(err,popRes){
				return next(err,popRes);
			});
		});
}
exports.isFriend = function(reqId,classIds,next) {
	user.count({_id:reqId,classId:{$in:classIds}},function(err,res){
		return next(err,res);
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
exports.getUserStatus = function(id,next){
	user.findOne({_id:id },{'chatStatus':1},function(err,doc) {
		return next(err,doc);
	});
}
user.schema.path('imageUrl').validate(function (value) {
	if(!value && !this.imageUrl && this.email){
		this.imageUrl = gravatar.url(this.email, {s:'50',r:'pg',d:'identicon'}, true);
	}else if(this.imageUrl){
		this.imageUrl = value;
	}
	return true;
}, 'Invalid image URL');