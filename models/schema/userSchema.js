var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId
	, enumTypes = require('models/schema/enumTypes');

var userSchema = new Schema({
	userName: { type:String, lowercase: true},
	firstName:{ type:String, lowercase: true},
	lastName: { type:String, lowercase: true},
	password: {type:String, select:false},
	type: { type:String, required:true, enum:enumTypes.userTypes ,select:true},
	email: { type:String, required:true , lowercase: true , trim: true},
	date: { type : Date , default : Date.now ,select:false},
	lastLogin: {type : Date , default : Date.now ,select:false},
	classId: [{type : ObjectId , ref : 'class'}],
	accesssToken: {type:String, select:false},
	tokenExpDate: {type:Date, select:false},
	imageUrl:{type:String, default:""},
	__v: { type: Number, select: false}
});

// userSchema.path('classId')
//pre and post not work after update... use save instead!
userSchema.pre('save', function(next) {
	if (this.isNew) {
		//something
		next()
	}
});

module.exports = userSchema;