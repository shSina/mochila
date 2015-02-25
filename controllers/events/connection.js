var io = require('lib/sio').io
	, token = require('lib/token')
	, error = require('lib/resFormat').error
	, userModel = require('models/userModel');

io.set('authorization', function (handshakeData, callback) {
	var reqToken = handshakeData._query.name;
	token.verify(reqToken,function(err,decoded){
		if(err)
			return callback(null, false);
		handshakeData.headers.token = decoded;
		callback(null, true);
	});
});

var sockets = { };
io.on('connection', function(socket){ 
	
	console.log('someone connected.');
	var userId = socket.handshake.headers.token._id;

	for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {	
		socket.join(socket.handshake.headers.token.classId[i]);
	};

	if(userId in sockets)
	{
		sockets[userId].socketss.push(socket);
	} 
	else
	{
		sockets[userId] = {
		    socketss:[socket],
			classId:socket.handshake.headers.token.classId,
			chatStatus : ""
		}
		userModel.getUserStatus(userId,function(err,dbRes){
			if(err)
				console.log(new Error(err));//return next(new Error(err));
			else{
				sockets[userId].chatStatus = dbRes.chatStatus;
			}
		});
	}
	
	socket.on('bcMessage', function(msg){
    	socket.broadcast.to(socket.handshake.headers.token.classId[0])
    	.emit('bcMessage', {
    		from : userId,
    		message : msg
    	});
  	});

	socket.on('toMessage', function(msg){
   		// sockets[users[to]].socket.emit(
   		if(  sockets[msg.to] && sockets[msg.to].socketss)
    	sockets[msg.to].socketss.forEach(function(value){
    		value.emit('toMessage', 
            { 
                from : userId,
                message : msg.message
            });
    	});
  	});

  	socket.on('disconnect', function () {
  		
    	socket.leave(socket.handshake.headers.token.classId[0]);

    	if(sockets[userId].socketss.length = 1 )
    		delete sockets.userId;
    	else{
	    	sockets[userId].socketss.forEach(function(value,index){
	    		if(value.id == socket.id)
	    			delete sockets[userId].socketss[index];
	    	});
    	}
	  
  	});
})

function ShowResults(value, index, ar) {
    console.log("value: " + value.id);
    console.log(" index: " + index);
}

module.exports = sockets;