var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId
	, classModel = require('models/classModel')
	, enumTypes = require('models/schema/enumTypes')
	, toObj = require('lib/toObj')
	, gravatar = require('gravatar');

var userSchema = new Schema({
	userName: { type:String, lowercase: true},
	firstName:{ type:String, lowercase: true},
	lastName: { type:String, lowercase: true},
	password: {type:String, select:false},
	type: { type:String, required:true, enum:enumTypes.userTypes ,select:true},
	email: { type:String, required:true , unique:true , lowercase: true , trim: true},
	date: { type : Date , default : Date.now ,select:false},
	lastLogin: {type : Date , default : Date.now ,select:false},
	classIds: [{type : ObjectId , ref : 'class'}],
	accesssToken: {type:String, select:false},
	tokenExpDate: {type:Date, select:false},
	imageUrl:{type:String, default:""},
	imageDef:{type:Boolean , default:false},
	chatStatus:{type:String, default:"invis"},
	__v: { type: Number, select: false}
});

userSchema.pre('save', function(next) {
	if (this.isNew && !this.imageUrl) {
		this.imageUrl = gravatar.url(this.email, {s:'50',r:'pg',d:'identicon'}, true);
		this.imageDef = false;
		next();
	}else{
		next();
	}
});

userSchema.pre('save', function(next){
	if(this.classIds && Array.isArray(this.classIds) && this.classIds.length != 0 ){
		classModel.checkExist(this.classIds,function(err){
			if(err) return next(err);
			next();
		})
	}else{
		next();
	}
});

userSchema.pre('update', function(next){
	// if(this.classId)
	// 	classModel.checkExist(this.classId,function(err){
	// 		if(err) return next(err);
	// 		next();
	// 	})
	// else
	// 	next();
});
// var validateClassIds = function(next){
// 	if(this.classId)
// 		classModel.checkExist(this.classId,function(err){
// 			if(err) return next(err);
// 			next();
// 		})
// 	else
// 		next();
// }
module.exports = userSchema;