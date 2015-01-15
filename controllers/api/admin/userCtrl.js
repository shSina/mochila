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
    
router.post('/',jsonParser,function (req,res,next) {
	//add this part to mongoose itself pre save validation
	for (var i = req.body.classId.length - 1; i >= 0; i--) {	
		req.body.classId[i] = ObjectId(req.body.classId[i]);
	};
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
	user.deleteUser(req.param('userId') , function(err){
		next(err);
	});
	res.send("user deleted");
})

router.put('/:userId',function(req,res,next){
	user.updateUser(req.param('userId') , req.body , function(err){
		next(err);
	});
	res.send("user updated");
}) 

module.exports = router;