var util = require('util');
var mongoose = require('mongoose');

// default to a 'localhost' configuration:
// set variables in env.sh if different
var connection_string = '127.0.0.1:27017/mochila';
if(process.env.MONGODB_DB_PASSWORD){
	connection_string = process.env.MONGODB_DB_USERNAME + ":" +
	process.env.MONGODB_DB_PASSWORD + "@" +
	process.env.MONGODB_DB_HOST + ':' +
	process.env.MONGODB_DB_PORT + '/' +
	process.env.APP_NAME;
}

mongoose.connect('mongodb://'+connection_string);

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
	console.log("connected to database.")
});