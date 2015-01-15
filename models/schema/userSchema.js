var mongoose = require('mongoose')
	, Schema = mongoose.Schema
 	, ObjectId = Schema.Types.ObjectId
    , enumTypes = require('models/schema/enumTypes');

var userSchema = new Schema({
    userName: { type:String, lowercase: true},
    firstName: String,
    lastName: String,
    password: String,
    type: { type:String, required:true, enum:enumTypes.userTypes },
    email: { type:String, required:true , lowercase: true , trim: true},
    date: { type : Date , default : Date.now },
    lastLogin: {type : Date , default : Date.now},
    classId: [{type : ObjectId , ref : 'class'}],
    accesssToken: String,
    tokenExpDate: Date
});

userSchema.path('classId')
//pre and post not work after update... use save instead!
userSchema.pre('save', function(next) {
    if (this.isNew) {
        //something
        next()
    }
});

module.exports = userSchema;