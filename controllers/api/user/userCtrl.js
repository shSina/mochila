var router = require('express').Router()
	, bodyParser = require('body-parser')
	, userModel = require('models/userModel')
	, classModel = require('models/classModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

//all / routing must have userToken 
//simple user in token added to req object
router.use(userToken);

router.get('/',function(req,res,next){
	userModel.getMyInfo(req.userToken._id,function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})
router.get('/friends',function(req,res,next){
	 userModel.getAllFriends(req.userToken._id,req.userToken.classId, function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})
router.get('/:userId',function (req,res,next) {
	userModel.getUserInfoById(req.params.userId,req.userToken.classId, function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})
module.exports = router;    