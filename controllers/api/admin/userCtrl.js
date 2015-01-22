//admin/user
var router = require('express').Router()
	, bodyParser = require('body-parser')
	, user = require('models/userModel')
	, ObjectId = require('mongoose').Types.ObjectId
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

//all admin/user routing must have userToken
router.use(userToken);

router.param('userId', function (req, res, next, userId) {
	user.getUserById(userId,function(err,dbRes){
		if(err)
			return next(new Error('userId not valid'));
		else if (dbRes === null){
			return res
					.status(400)
					.json(error(undefined,'user not exist'));
		}
		else{
			req.userParam = dbRes;
			next();
		}
	})
});

router.post('/',jsonParser,function (req,res,next) {
	//add this part to mongoose itself pre save validation
	if(req.body && req.body.classId && Array.isArray(req.body.classId)){
		for(var i = req.body.classId.length - 1; i >= 0; i--) {	
			req.body.classId[i] = ObjectId(req.body.classId[i]);
		};
	}else{
		return res
				 .status(400)
				 .json(error(undefined,'classId invalid or not exist'));
	}

	user.addUser( req.body , function(err,item){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(item));
		}
	});
})

router.get('/',function(req,res,next){
	user.getAllUsers(function(err,items){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(items));
		}
	})
})

router.delete('/:userId',function(req,res,next){
	user.deleteUser(req.userParam._id,function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,"user deleted."));
		}
	});
})

router.put('/:userId',function(req,res,next){
	user.updateUser(req.param('userId') , req.body , function(err){
		next(err);
	});
	res.send("user updated");
}) 

module.exports = router;