//admin/class
var router = require('express').Router()
	, bodyParser = require('body-parser')
	, classModel = require('models/classModel')
	, userModel = require('models/userModel')
    , success = require('lib/resFormat').success()
    , error = require('lib/resFormat').error()
    , userToken = require('controllers/middlewares/userTokenMidd')
    , jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

//all admin/class routing must have userToken
router.use(userToken);

router.post('/',jsonParser,function(req,res,next){
	classModel.addClass( req.body , function(err,item){
		if(err)
			return next(new Error(err));
		else{
			success.data = item;
			res.json(success);
		}
	});
})

router.get('/',function(req,res,next) {
	classModel.getAllClasses(function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			success.data = dbRes;
			res.json(success);
		}
	});
})

router.get('/:classId',function (req,res,next) {
	classModel.getUsersByClassId( req.param('classId') , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			success.data = dbRes;
			res.json(success);
		}
	});
})

router.delete('/:classId',function(req,res,next){
	classModel.deleteClass(req.param('classId') , function(err){
		next(err);
	});
	res.send("class deleted");
})

router.put('/:classId',function(req,res,next){
	classModel.updateClass(req.param('classId') , req.body , function(err){
		next(err);
	});
	res.send("class updated");
}) 

module.exports = router;