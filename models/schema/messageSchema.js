var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId;

var messageSchema = new Schema({
	body 	: String,
	from 	: {type : ObjectId , ref : 'user'},
	room	: {type : ObjectId },
	toClass	: {type : ObjectId , ref : 'class'},
	date 	: {type : Date , default : Date.now},
	__v	 	: { type: Number, select: false}
});
 
module.exports = messageSchema;