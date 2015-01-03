var mongoose = require('mongoose'), 
   	userSchema = require('models/schema/userSchema'),
    Class = require('./classModel');
 
var user = mongoose.model('user', userSchema);

exports.addUser = function(item,next) {
	new user(item).save(function(err,doc){
		return next(err,doc);
	});
}

exports.deleteUser = function(id,next) {
	user.remove({_id : id}).exec(function(err){
		next(err);
	});
}

exports.findUser = function(id,next){ 
	user.find({_id : id},function(err,doc){
		return next(err,doc);
	});
}
exports.userExist = function(email,password,next) {
	user.findOne({email :email,password:password},function(err,doc){
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