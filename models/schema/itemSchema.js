var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId;

var itemSchema = new Schema({
    authorId : ObjectId, 
    authorType : String, 
    body : String,
    itemType : String,
    itemTag : Array, 
    date : {type : Date , default : Date.now},
	classId : ObjectId,   
    comment : [{
		body : String, 
		date : {type : Date , default : Date.now},
		authorId : ObjectId,
		replyIds : [ObjectId]
	}]
});
 
module.exports = itemSchema;