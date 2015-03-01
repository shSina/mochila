var mongoose = require('mongoose')
	, ObjectId = require('mongoose').Types.ObjectId 
	, messageSchema = require('models/schema/messageSchema');

var message = mongoose.model('message', messageSchema);

exports.saveMessage = function(item,next) {
	new message(item).save(function(err,dbRes){
		return next(err,dbRes);
	});
}