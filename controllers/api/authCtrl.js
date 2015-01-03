var router = require('express').Router()
    , user = require('models/userModel')
    , token = require('lib/token')
	, userToken = require('controllers/middlewares/userTokenMidd')
    , success = require('lib/resFormat').success()
    , error = require('lib/resFormat').error(); 

router.post('/signin',function (req,res,next){
	user.userExist(req.body.email,req.body.password, function(err, user) {
        if (err) {
            return next(new Error(err));
        }else if (user) {
            success.data = user;
            success.token = token.sign(user,{expiresInMinutes:token.expireAfter._1M});
            success.tokenExpDate = token.expireAfter._1M;
            res.json(success);
        } else {
        	res.status(403);
            delete error['data'];
            error.message = 'invalid username/password';
            res.json(error);
		}
    });
})
router.post('/signup',function (req,res,next){
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