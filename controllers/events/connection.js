var io = require('lib/sio').io;

io.on('connection', function(socket){ 
	console.log('connected');
})