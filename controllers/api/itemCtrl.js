var router = require('express').Router()
	, bodyParser = require('body-parser')
	, itemModel = require('models/itemModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000})//limit request body json less than 1k
	, userEmiter = require('controllers/events/connection');

//all /item routing must have userToken 
//simple user in token added to req object
router.use(userToken);


router.post('/',jsonParser,function(req,res,next){
	
	//req.body.classId : add later! 
	req.body.authorId = req.userToken._id;
	req.body.authorType = req.userToken.type;
	req.body.classId = req.userToken.classId[0];

	itemModel.addItem( req.body , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
			userEmiter.forEach(function(userSocket){
				userSocket.emit('newItem',null);
			})
		}
	});
})

router.get('/' , function(req,res,next){
	itemModel.getAllByClassId (req.userToken.classId[0] , function(err,dbRes){
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
// solamente update body,tag, comments
router.put('/:itemId',jsonParser,function(req,res,next){
	itemModel.updateItemById(req.params.itemId, req.userToken._id ,req.body , function(err){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(undefined,'item updated.'));
		}
	});
}) 


module.exports = router;