var middleware = function(socket,next){
	socket.on('disconnect', function () {
		
		// for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {	
		// 	socket.leave(socket.handshake.headers.token.classId[i]);
		// };

		// if(sockets[userId].socket.length = 1 )
		// 	delete sockets.userId;
		// else{
		// 	sockets[userId].socket.forEach(function(value,index){
		// 		if(value.id == socket.id)
		// 			delete sockets[userId].socket[index];
		// 	});
		// }
	  
	});
	next();
}

module.exports = middleware;