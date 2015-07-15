var app = require('lib/app')	
	, http = require('http').Server(app)
    , io = require('socket.io')(http);
	// , sio_redis = require('socket.io-redis');

// io.adapter(sio_redis({ host: process.env.REDIS_HOST, port:process.env.REDIS_PORT }));
module.exports = {
	io:io,
	http:http
};