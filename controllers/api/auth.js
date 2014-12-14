var router = require('express').Router()
	, user_token = require('../../lib/access')
	, user = require('../../models/users')
	, jwt = require('jsonwebtoken');

router.post('/signin',function (req,res){
	user.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
        	console.log(err);
        	res.status(403);
            res.json({
            	success:false,
                error: 'forbidden'
            });
        }else if (user) {
            res.json({
                success: false,
                data: "User already exists!"
            });
        } else {
            res.status(403);
            res.json({
            	success:false,
                error: 'forbidden'
            });
		}
    });
})
router.post('/signup',function (req,res){
	// var userModel = new user();
 //    userModel.email = req.body.email;
 //    userModel.password = req.body.password;
 //    userModel.save(function(err, user) {
 //        user.token = jwt.sign(user, process.env.JWT_SECRET);
 //        user.save(function(err, user1) {
 //            res.json({
 //                type: true,
 //                data: user1,
 //                token: user1.token
 //            });
 //        });
 //    })
})
module.exports = router;