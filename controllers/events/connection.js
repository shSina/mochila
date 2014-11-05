var io = require('../../lib/expressio').io;

io.on('connection', function(socket){ 
	console.log('connected');
})