var io = require('../../lib/sio_io').io;

io.on('connection', function(socket){ 
	console.log('connected');
})