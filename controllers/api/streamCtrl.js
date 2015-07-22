var router = require('express').Router()
	, bodyParser = require('body-parser')
	, postModel = require('models/postModel')
	, itemModel = require('models/itemModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000})//limit request body json less than 1k
	, userEmiter = require('controllers/events/connection');

router.use(userToken);


router.get('/' , function(req,res,next){
	if(!req.userToken.classIds[0])
		return res
				.status(400)
				.json(error(undefined,'classId required'));

	itemModel.getAllByClassId (req.userToken.classIds[0] , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})

router.get('/:itemId',function (req,res,next) {
	itemModel.getItemById( req.params.itemId , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})

router.delete('/:itemId',function(req,res,next){
	itemModel.deleteItemById(req.params.itemId, req.userToken._id,function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,'item deleted.'));
		}
	});
})
module.exports = router;