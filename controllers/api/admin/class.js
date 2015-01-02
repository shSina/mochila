var router = require('express').Router();
var Class = require('models/classModel'),
	user = require('models/userModel');

router.post('/',function(req,res,next){
	Class.addClass( req.body , function(err){
		next(err);
	});
	res.send("class added");
})

router.get('/',function(req,res,next) {
	Class.getAllClasses(function(err,dbRes){
		if(err)
			next(err);
		res.json(dbRes);
	});
})

router.get('/:classId',function (req,res,next) {
	user.getUsersByClassId( req.param('classId') , function(err,dbRes){
		if(err)
			next(err);
		res.json(dbRes);
	});
})

router.delete('/:classId',function(req,res,next){
	Class.deleteClass(req.param('classId') , function(err){
		next(err);
	});
	res.send("class deleted");
})

router.put('/:classId',function(req,res,next){
	user.updateClass(req.param('classId') , req.body , function(err){
		next(err);
	});
	res.send("class updated");
}) 

module.exports = router;