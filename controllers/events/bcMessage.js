var middleware = function(socket,next){
	socket.on('bcMessage', function(data){

	});
	next();
}

module.exports = middleware;