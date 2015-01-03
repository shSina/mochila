//admin/user
var router = require('express').Router()
	, user = require('models/userModel')
	, ObjectId = require('mongoose').Types.ObjectId
    , success = require('lib/resFormat').success()
    , error = require('lib/resFormat').error(); 
    
router.post('/',function (req,res,next) {
	for (var i = req.body.classId.length - 1; i >= 0; i--) {	
		req.body.classId[i] = ObjectId(req.body.classId[i]);
	};
	user.addUser( req.body , function(err,item){
		if(err)
			return next(new Error(err));
		else{
			success.data = item;
			res.json(success);
		}
	});
})
router.get('/',function(req,res,next){
	user.getAllUsers(function(err,items){
		if(err)
			return next(new Error(err));
		else{
			success.data = items;
			res.json(success);
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