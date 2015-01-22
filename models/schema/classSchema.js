var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId;

var classSchema = new Schema({
	teacherId : {type : ObjectId , ref : 'user'},
	studentsIds : [{type : ObjectId , ref : 'user'}],
	studentsCount : {type:Number, select:false},
	startDate : {type : Date , default : Date.now},
	endDate : Date,
	__v: { type: Number, select: false}
});
 
module.exports = classSchema;