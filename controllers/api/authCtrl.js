var router = require('express').Router()
    , bodyParser = require('body-parser')
    , user = require('models/userModel')
    , token = require('lib/token')
    , userToken = require('controllers/middlewares/userTokenMidd')
    , success = require('lib/resFormat').success
    , error = require('lib/resFormat').error
    , expAfter = token.expireAfter
    , jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

router.post('/signin',jsonParser,function (req,res,next){
	user.userExist(req.body.email,req.body.password, function(err, userItem) {
        if (err) {
            return next(new Error(err));
        }else if (userItem) {
            var accessToken = token.sign(userItem,{expiresInMinutes:expAfter._1M});
            // shoud 
            // add token for userItem later here
            res.json(success(userItem,undefined,accessToken,expAfter._1M));
        } else {
            res
            .status(403)
            .json(error(undefined,'invalid username/password'));
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