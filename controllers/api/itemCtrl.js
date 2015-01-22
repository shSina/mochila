var router = require('express').Router()
	, bodyParser = require('body-parser')
	, itemModel = require('models/itemModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, userToken = require('controllers/middlewares/userTokenMidd')
	, jsonParser = bodyParser.json({limit:1000});//limit request body json less than 1k

//all /item routing must have userToken 
//simple user in token added to req object
router.use(userToken);


router.post('/',jsonParser,function(req,res,next){
	// console.log(req.body);
	req.body.authorId = req.userToken._id;
	itemModel.addItem( req.body , function(err,dbRes){
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