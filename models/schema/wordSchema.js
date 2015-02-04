var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId
	, enumTypes = require('models/schema/enumTypes');

var wordSchema = new Schema({
	authorId : { type:ObjectId, required:true, ref : 'user' },
	authorType : { type:String, required:true, enum:enumTypes.userTypes },
	body : {
		word:{ type:String ,default:'' , required:true},
		definition:{type:String , default:'', required:true},
		startDate:{type : Date }
	},
	itemType : {type:String,required:true,enum:['word']},
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
 
module.exports = wordSchema;
