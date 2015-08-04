var router = require('express').Router()
	, bodyParser = require('body-parser')
	, imageModel = require('models/imageModel')
	, success = require('lib/resFormat').success
	, error = require('lib/resFormat').error
	, ObjectId = require('mongoose').Types.ObjectId
	, userToken = require('controllers/middlewares/userTokenMidd')
	, multer  = require('multer');

var storage = multer.diskStorage({
	destination: './public',
	filename: function (req, file, cb) {
		// console.log(file);
		var name = ObjectId()+'.'+file.mimetype.split("/")[1];
		req.filename = name;
		cb(null,name);
	}
});
var upload = multer({ storage: storage });

router.use(userToken);

router.post('/',upload.single('file'),function(req,res,next){
	var item = {
        body:{
    		message:req.body.message,
    		imageName:req.filename
        },
        itemType:'image'
	}
	
	item.authorId = req.userToken._id;
	item.classId = req.userToken.classIds[0];//item.classId
	item.authorType = req.userToken.type;
	if(req.body.classId in req.userToken.classIds)
		return next(new Error("check this code"));
	imageModel.addImage(item , function(err,dbRes){
		if(err)
			return next(new Error(err));
		else{
			res.json(success(dbRes));
		}
	});
})


module.exports = router;