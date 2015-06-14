var io = require('lib/sio').io
	, token = require('lib/token')
	, error = require('lib/resFormat').error
	, userModel = require('models/userModel')
	, messageModel = require('models/messageModel')
	, redis = require('redis');

var redis_client = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST);
redis_client.on('connect', function() {
    console.log('redis connected');
});

io.set('authorization', function (handshakeData, callback) {
	var reqToken = handshakeData._query.name;
	token.verify(reqToken,function(err,decoded){
		if(err)
			return callback(null, false);
		handshakeData.headers.token = decoded;
		callback(null, true);
	});
});

io.on('connection', function(socket){ 
	
	console.log('someone connected.');
	var userId 	= socket.handshake.headers.token._id;
	var classIds = socket.handshake.headers.token.classIds;
	socket.join(classIds[0]);
	console.log(userId,classIds[0]);
});