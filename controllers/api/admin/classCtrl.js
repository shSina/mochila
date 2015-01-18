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
//simple user in token added to req object
router.use(userToken);

//adding parameters to req object
router.param('classId', function (req, res, next, classId) {
	classModel.getClassById(classId,function(err,dbRes){
		if(err)
			return next(new Error('failed to load classId'));
		else{
			req.class = dbRes;
			next();
		}
	})
});

router.post('/',jsonParser,function(req,res,next){
	classModel.addClass( req.body , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			success.data = dbRes;
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
	classModel.getClassById( req.class._id , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			success.data = dbRes;
			res.json(success);
		}
	});
})

router.delete('/:classId',function(req,res,next){
	classModel.deleteClass(req.class._id , function(err){
		if(err)
			return next(new Error(err));
		else{
			success.data = dbRes;
			res.json(success);
		}
	});
})

router.put('/:classId',function(req,res,next){
	classModel.updateClass(req.param('classId') , req.body , function(err){
		next(err);
	});
	res.send("class updated");
}) 

module.exports = router;