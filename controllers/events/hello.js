var middleware = function(socket,next){
	socket.on('hello', function (socket, next) {
		console.log('salam');
	});
	next();
}

module.exports = middleware;