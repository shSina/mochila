var token = require('lib/token')
	, appRuntime = require('lib/app').get('env')
	, error = require('lib/resFormat').error;
	
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
			req.user = decoded;
			return next();
		}
	});

}

module.exports = attachToken;