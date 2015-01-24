var io = require('lib/sio').io;

var sockets = [];

io.on('connection', function(socket){ 
	console.log('someone connected.');
	// socket.emit('newItem',null);
	sockets.push(socket);
})

module.exports = sockets;