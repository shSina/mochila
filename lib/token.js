var jwt = require('jsonwebtoken')
	, fs = require('fs')
	, secret = process.env.JWT_SECRET || 'secret';
	// , privCert = fs.readFileSync('config/private.key')
	// , pubCert = fs.readFileSync('config/public.key');

var sign = function(data,options){
	console.log(data)
	var token = jwt.sign(data, secret,options);
	console.log(data)
	return token;
}
// var signSecure = function(data,options){
// 	if(!options)
// 		var options = {};
// 	options.algorithm = 'RS256';
// 	return jwt.sign(data, privCert,options);
// }
var verify = function(data,callback,options){
	jwt.verify(data,secret,options,function(err, decoded) {
		callback(err, decoded);
	});
}
module.exports = {
	sign : sign,
	// signSecure : signSecure,
	verify: verify,
	expireAfter:{//number are in minutes
		_5m:5,
		_15m:15,
		_30m:30,
		_1h:60,
		_1d:1440,
		_1M:43200
	}
}