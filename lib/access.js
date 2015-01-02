var jwt = require('jsonwebtoken')
	, fs = require('fs')
	, secret = process.env.JWT_SECRET || 'secret'
	, cert = fs.readFileSync('config/private.key');

var signByHash = function(data){
	return jwt.sign(data, secret);
}

var signSecure = function(data){
	return jwt.sign(data, secret);
}

var verify = function(data,callback){
	jwt.verify(secret, function(err, decoded) {

	});
}

//attach token to res and continue on next router or deny access
var attachToken = function(req,res,next){
	var reqToken = req.get('x-access-token');
	verify(reqToken,function(err,decoded){
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
	signByHash : signByHash,
	signSecure : signSecure,
	verify: verify,
	attachToken: attachToken
}