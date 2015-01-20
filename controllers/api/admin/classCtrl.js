//admin/class
var router = require('express').Router()
	, bodyParser = require('body-parser')
	, classModel = require('models/classModel')
	, userModel = require('models/userModel')
    , success = require('lib/resFormat').success
    , error = require('lib/resFormat').error
    , userToken = require('controllers/middlewares/userTokenMidd')
    , jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

//all admin/class routing must have userToken 
//simple user in token added to req object
router.use(userToken);

//adding parameters to req object
router.param('classId', function (req, res, next, classId) {
	classModel.getClassById(classId,function(err,dbRes){
		if(err)
			return next(new Error('classId not valid'));
		else if (dbRes === null){
			return res
					.status(400)
					.json(error(undefined,'class not exist'));
		}
		else{
			req.class = dbRes;
			next();
		}
	})
});

router.post('/',jsonParser,function(req,res,next){
	//add this part to mongoose itself pre save validation
	if(req.body && req.body.classId && Array.isArray(req.body.classId)){
		for(var i = req.body.classId.length - 1; i >= 0; i--) {	
			req.body.classId[i] = ObjectId(req.body.classId[i]);
		};
	}
	if(req.body && req.body.teacherId){
		req.body.teacherId = ObjectId(req.body.teacherId);
	}else{
		delete req.body.teacherId;
	}
	
	classModel.addClass( req.body , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})

router.get('/',function(req,res,next) {
	classModel.getAllClasses(function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})

router.get('/:classId',function (req,res,next) {
	classModel.getClassById( req.class._id , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})
router.delete('/:classId',function(req,res,next){
	classModel.deleteClassById(req.class._id, function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,'class deleted.'));
		}
	});
})
router.put('/:classId',jsonParser,function(req,res,next){
	classModel.updateClassById(req.class._id, req.body , function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,'user updated.'));
		}
	});
}) 

module.exports = router;