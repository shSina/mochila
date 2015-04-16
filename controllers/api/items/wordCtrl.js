var router = require('express').Router()
	, bodyParser = require('body-parser')
	, wordModel = require('models/wordModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k
	// , userEmiter = require('controllers/events/connection');

router.use(userToken);

router.post('/',jsonParser,function(req,res,next){
	
	//req.body.classId : add later! 
	req.body.authorId = req.userToken._id;
	req.body.authorType = req.userToken.type;
	if(req.body.classId in req.userToken.classIds)
		return next(new Error("check this code"));

	// req.body.itemType = 'post';
	
	wordModel.addWord( req.body , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
			// userEmiter.forEach(function(userSocket){
			// 	userSocket.emit('newItem',null);
			// })
		}
	});
})

// solamente update body,tag, comments
router.put('/:itemId',jsonParser,function(req,res,next){
	wordModel.updateWordById(req.params.itemId, req.userToken._id ,req.body , function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,'word updated.'));
		}
	});
}) 

router.get('/' , function(req,res,next){
	wordModel.getTodayWords(req.userToken._id , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})

module.exports = router;