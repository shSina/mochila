var io = require('lib/sio').io;

var middleware = function(socket,next){
	socket.on('allclass', function (data) {
		// console.log(data);
		
		// io.sockets.emit('an event sent to all connected clients');
		//broad cast to all class
		io.sockets.in(socket.handshake.headers.token.classIds[0])
					.emit('allclass',{message:data.text,
									from:socket.handshake.headers.token._id});
	});
	next();
}

module.exports = middleware;