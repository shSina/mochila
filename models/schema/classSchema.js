var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId;

var classSchema = new Schema({
    teacherId : ObjectId,
    studentsIds : [{type : ObjectId , ref : 'user'}],
    studentsCount : Number,
    startDate : {type : Date , default : Date.now},
    endDate : Date  
});
 
module.exports = classSchema;