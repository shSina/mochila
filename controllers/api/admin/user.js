var router = require('express').Router();
var user = require('models/userModel');

router.post('/',function (req,res,next) {
	user.addUser( req.body , function(err){
		next(err);
	});
	res.send("user added");
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