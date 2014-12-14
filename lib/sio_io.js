var app = require('./exp_app')	
	, http = require('http').Server(app)
    , io = require('socket.io')(http);

module.exports = {
	io:io,
	http:http
};