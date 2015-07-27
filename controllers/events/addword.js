var io = require('lib/sio').io;

var middleware = function(socket,next){
	socket.on('addword', function(data){
		io.sockets.in(socket.handshake.headers.token.classIds[0])
					.emit('newWord',{});
	});
	next();
}

module.exports = middleware;