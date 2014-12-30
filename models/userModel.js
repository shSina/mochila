var mongoose = require('mongoose'), 
    userSchema = require('models/schema/userSchema');
 
var user = mongoose.model('user', userSchema);

exports.addUser = function(item,next) {
	new user(item).save(function(err){
		if (err)
			next(err);
	});
}

exports.deleteUser = function(id,next) {
	user.remove({_id : id}).exec(function(err){
		next(err);
	});
}

exports.findUser = function(id,options,next){ 
	user.find({_id : id},options,function(err,doc){
		if(err)
			next(err);
		else
			next(doc);
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
		if (err)
			next(err);
		else
			next(docs);
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