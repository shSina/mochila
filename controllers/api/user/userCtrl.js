var router = require('express').Router()
	, bodyParser = require('body-parser')
	, userModel = require('models/userModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

//all / routing must have userToken 
//simple user in token added to req object
router.use(userToken);

router.get('/',function(req,res,next){
	console.log(req.userToken.classId);
	userModel.getAllFriends(req.userToken.classId, function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})
var util = require('util');
router.get('/:userId',function (req,res,next) {
	// console.log("My Id  : " + req.userToken._id);
	// console.log("Id  : " + req.params.userId);
	console.log("ClassId  : " + util.inspect(req.userToken));
	userModel.getUserInfo(req.userToken._id,req.userToken.classId
						 ,req.params.userId, function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})
module.exports = router;