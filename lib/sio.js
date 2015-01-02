var app = require('lib/app')	
	, http = require('http').Server(app)
    , io = require('socket.io')(http);

module.exports = {
	io:io,
	http:http
};