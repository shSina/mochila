var io_router = require('../../lib/expressio').io_router;

io_router.on('hello', function (socket, args, next) {
	console.log('salam');
	next();
});

module.exports = io_router;