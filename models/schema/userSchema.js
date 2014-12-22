var mongoose = require('mongoose')
	, Schema = mongoose.Schema
 	, ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    date : {type : Date , default : Date.now},
    lastLogin : {type : Date , default : Date.now},
    classId : [ObjectId],
    accesss_token: String
});

module.exports = userSchema;