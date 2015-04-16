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

// var sockets   = {},
// 	bcMessage = {},
// 	toMessage = {};
io.on('connection', function(socket){ 
	
	console.log('someone connected.');
	var userId 	= socket.handshake.headers.token._id;
	var classIds = socket.handshake.headers.token.classId;

	// for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {	
	// 	socket.join(socket.handshake.headers.token.classId[i]);
	// };

	// if(userId in sockets)
	// {
	// 	sockets[userId].socket.push(socket);
	// } 
	// else
	// {
	// 	sockets[userId] = {
	// 	    socket:[socket],
	// 		classId:socket.handshake.headers.token.classId,
	// 		chatStatus : ""
	// 	}
	// 	userModel.getUserStatus(userId,function(err,dbRes){
	// 		if(err)
	// 			console.log(new Error(err));//return next(new Error(err));
	// 		else{
	// 			console.log("dbRes  " + dbRes.chatStatus);
	// 			sockets[userId].chatStatus = dbRes.chatStatus;
	// 		}
	// 	});
	// }
})

// function ShowResults(value, index, ar) {
//     console.log("value: " + value.id);
//     console.log(" index: " + index);
// }

// module.exports = sockets;