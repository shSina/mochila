var io_router = require('socket.io-events')();
var tmp=0;
io_router.on('message', function (socket, args, next) {

		// socket.on('message', function(msg){
    socket.broadcast.to(socket.handshake.headers.token.classId[0])
    	.emit('message', msg);
    console.log(msg);
  // });
	// console.log(++tmp);
	//console.log(socket.sock.handshake.headers.token);
	// socket.broadcast.to(socket.handshake.headers.token.classId[0])
 // 		.emit('message', data);
	// console.log(data);
	next();
});

module.exports = io_router;


// var io = require('lib/sio').io;
// io.on('message:send',function(socket,data){
// 	console.log(data);
// });