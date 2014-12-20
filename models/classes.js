var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId;

var classSchema = new Schema({
    teacherId : ObjectId,
    studentsIds : [ObjectId],
    studentsCount : Number,
    startDate : {type : Date , default : Date.now},
    endDate : Date  
});
 
module.exports = mongoose.model('class', classSchema);