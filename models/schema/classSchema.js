var mongoose = require('mongoose')
	, async  = require('async')
	, userModel = require('models/userModel')
	, Schema = mongoose.Schema
	, ObjectId = Schema.Types.ObjectId;

var classSchema = new Schema({
	className : { type:String, lowercase: true},
	teacherId : {type : ObjectId , ref : 'user'},
	studentsIds : [{type : ObjectId , ref : 'user'}],
	studentsCount : {type:Number, select:false},
	startDate : {type : Date , default : Date.now},
	endDate : Date,
	__v: { type: Number, select: false}
});

classSchema.pre('save', function(next){
	var self = this;
	async.series([function(cb){
		if(self.teacherId){
			userModel.teacherExist(self.teacherId,function(err){
				cb(err || null);
			})
		}else{
			delete self.teacherId;
			cb(null);
		}
	},function(cb){
		if(self.studentsIds && Array.isArray(self.studentsIds) && self.studentsIds.length != 0 ){
			userModel.checkExist(self.studentsIds,function(err){
				cb(err || null);
			})
		}else{
			cb(null);
		}
	}],function(err,results){
		// console.log(err,results);
		self = null;
		if(err) return next(err);
		next();
	})
}); 
module.exports = classSchema;