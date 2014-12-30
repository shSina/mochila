var jwt = require('jsonwebtoken');

var tokenize = function(data){
	return jwt.sign(data, process.env.JWT_SECRET);
}

var verify = function(data,callback){
	jwt.verify(token,process.env.JWT_SECRET, function(err, decoded) {

	});
}

//attach token to res and continue on next router or deny access
var attach_token = function(req,res,next){
	var req_token = req.get('x-access-token');
	verify(req_token,function(err,decoded){
		if(err){
			//should also count as black list
			res.status(403);
            res.json({
            	success:false,
                error: 'forbidden'
            });
		}else{
			res.user = decoded;
			next();
		}
	});
}

module.exports = {
	token : tokenize,
	verify: verify,
	validate_token: attach_token
}