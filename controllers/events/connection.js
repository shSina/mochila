var io = require('lib/sio').io
	, token = require('lib/token')
	, error = require('lib/resFormat').error
	, userModel = require('models/userModel')
	, messageModel = require('models/messageModel');

io.set('authorization', function (handshakeData, callback) {
	var reqToken = handshakeData._query.name;
	token.verify(reqToken,function(err,decoded){
		if(err)
			return callback(null, false);
		handshakeData.headers.token = decoded;
		callback(null, true);
	});
});

var sockets   = {},
	bcMessage = {},
	toMessage = {};
io.on('connection', function(socket){ 
	
	console.log('someone connected.');
	var userId 	= socket.handshake.headers.token._id;
	var classIds = socket.handshake.headers.token.classId;

	for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {	
		socket.join(socket.handshake.headers.token.classId[i]);
	};

	if(userId in sockets)
	{
		sockets[userId].socket.push(socket);
	} 
	else
	{
		sockets[userId] = {
		    socket:[socket],
			classId:socket.handshake.headers.token.classId,
			chatStatus : ""
		}
		userModel.getUserStatus(userId,function(err,dbRes){
			if(err)
				console.log(new Error(err));//return next(new Error(err));
			else{
				console.log("dbRes  " + dbRes.chatStatus);
				sockets[userId].chatStatus = dbRes.chatStatus;
			}
		});
	}
	
	socket.on('bcMessage', function(data){
		var valid = false;
    	for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {
    		if(data.to == socket.handshake.headers.token.classId[i])
    			valid = true;
    	};
    	if(valid){
    		bcMessage = {
    			body : data.message,
    			from : userId,
    			toClass : data.to
    		}
    		messageModel.saveMessage(bcMessage,function(err,dbRes){
    			if(err)
					console.log(new Error(err));//return next(new Error(err));
				else{
					console.log(dbRes);
				}
    		});
	    	socket.broadcast.to(data.to)
	    	.emit('bcMessage', {
	    		to : data.to,
	    		from : userId,
	    		message : data.message
	    	});
    	}
    	else{
    		//something
    	}
  	});

	socket.on('toMessage', function(data){
   		// sockets[users[to]].socket.emit(
   		if( sockets[data.to] && sockets[data.to].socket)
   		{
   			userModel.isFriend(data.to,classIds,function(err,res){
   				if(err)
					console.log(new Error(err));//return next(new Error(err));
				else{
					if(res >= 1)
					{
						toMessage = {
		    			body : data.message,
		    			from : userId,
		    			toUser : data.to
			    		}
			    		messageModel.saveMessage(toMessage,function(err,dbRes){
			    			if(err)
								console.log(new Error(err));//return next(new Error(err));
							else{
								console.log(dbRes);
							}
			    		});
				    	sockets[data.to].socket.forEach(function(value){
				    		value.emit('toMessage', 
				            { 
				                from : userId,
				                message : data.message
				            });
				    	});
					}
				}
   			});
   		}
  	});

  	socket.on('disconnect', function () {
  		
    	for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {	
			socket.leave(socket.handshake.headers.token.classId[i]);
		};

    	if(sockets[userId].socket.length = 1 )
    		delete sockets.userId;
    	else{
	    	sockets[userId].socket.forEach(function(value,index){
	    		if(value.id == socket.id)
	    			delete sockets[userId].socket[index];
	    	});
    	}
	  
  	});
})

function ShowResults(value, index, ar) {
    console.log("value: " + value.id);
    console.log(" index: " + index);
}

module.exports = sockets;