var token = require('lib/token')
	, error = require('lib/resFormat').error();
	
//attach token to res and continue on next router or deny access
var attachToken = function(req,res,next){

	var reqToken = req.get('x-access-token');
	token.verify(reqToken,function(err,decoded){
		if(err){
			//should also count as black list
			res.status(403);
			error.data = err;
			error.message = 'invalid token';
            res.json(error);
		}else{
			req.user = decoded;
			next();
		}
	});

}

module.exports = attachToken;