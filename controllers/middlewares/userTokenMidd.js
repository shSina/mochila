var token = require('lib/token')
	, appRuntime = require('lib/app').get('env')
	, error = require('lib/resFormat').error
	, ObjectId = require('mongoose').Types.ObjectId;
	
//attach token to res and continue on next router or deny access
var attachToken = function(req,res,next){

	var reqToken = req.get('x-access-token');
	//send error if undefined or empty add here later
	
	token.verify(reqToken,function(err,decoded){
		if(err && appRuntime === 'development'){
			//should also count as black list
            return res
            		.status(403)
            		.json(error(err,'invalid token'));
		}else if(err){
            return res
            		.status(403)
            		.json(error(undefined,'invalid token'));
		}
		else{

			for (var i = decoded.classIds.length - 1; i >= 0; i--) {
					decoded.classIds[i] = ObjectId(decoded.classIds[i]);
			};
			decoded._id = ObjectId(decoded._id);
			
			req.userToken = decoded;
			return next();
		}
	});

}

module.exports = attachToken;