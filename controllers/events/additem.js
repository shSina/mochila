var io = require('lib/sio').io;

var middleware = function(socket,next){
	socket.on('additem', function(data){
		io.sockets.in(socket.handshake.headers.token.classIds[0])
					.emit('newItem',{});
	});
	next();
}

module.exports = middleware;