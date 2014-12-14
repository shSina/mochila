var io_router = require('socket.io-events')();

io_router.on('hello', function (socket, args, next) {
	console.log('salam');
	next();
});

module.exports = io_router;