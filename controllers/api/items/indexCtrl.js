var router = require('express').Router()
	, bodyParser = require('body-parser')
	, itemModel = require('models/itemModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000})//limit request body json less than 1k
	, userEmiter = require('controllers/events/connection');

//all / routing must have userToken 
//simple user in token added to req object
router.use(userToken);

router.delete('/:itemId',function(req,res,next){
	itemModel.deleteItemById(req.params.itemId, req.userToken._id,function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,'item deleted.'));
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

module.exports = router;