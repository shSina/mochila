var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId
	, enumTypes = require('models/schema/enumTypes');

var itemSchema = new Schema({
	authorId : { type:ObjectId, required:true, ref : 'user' },
	authorType : { type:String, required:true, enum:enumTypes.userTypes },
	body : {},
	itemType : {type:String,required:true,enum:enumTypes.itemTypes},
	itemTag : Array, 
	date : {type : Date , default : Date.now},
	classId : { type:ObjectId,required:true ,ref : 'class' },   
	comment : [{
		body : String, 
		date : {type : Date , default : Date.now},
		authorId : { type:ObjectId, required:true, ref : 'user' },
		replyTo : [{ type:ObjectId, ref : 'user' }]
	}],
	__v: { type: Number, select: false}
});
 
module.exports = itemSchema;