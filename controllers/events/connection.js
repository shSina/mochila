var io = require('lib/sio').io
	, token = require('lib/token')
	, error = require('lib/resFormat').error;

io.set('authorization', function (handshakeData, callback) {
	var reqToken = handshakeData._query.name;
	token.verify(reqToken,function(err,decoded){
		if(err)
			return callback(null, false);
		callback(null, true);
	});
});

var sockets = [];

io.on('connection', function(socket){ 
	console.log('someone connected.');
	socket.emit('newItem',null);
	sockets.push(socket);
})
module.exports = sockets;