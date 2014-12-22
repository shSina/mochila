var mongoose = require('mongoose'), 
    userSchema = require('./schema/userSchema');
 
var user = mongoose.model('user', userSchema);

exports.addUser = function(item,next) {
	new user(item).save(function(err){
		// error handeling!
		next(err);
	});
}

exports.deleteUser = function(id,next) {
	user.remove({_id : id}).exec(function(err){
		next(err);
	});
}

exports.findUser = function(id,options,next){ // options in argument???
	user.find({_id : id},options,function(err,doc){
		if(err)
			next(err);
		else
			next(doc);
	});
}

exports.updateUser = function(query,item,next){
	user.update(query,item,function(err,num) {
		if(err)
			next(err);
		else
			next(num);
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

module.exports = exports;