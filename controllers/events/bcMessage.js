var middleware = function(socket,next){
    socket.on('bcMessage', function(data){
		// var valid = false;
  //   	for (var i = socket.handshake.headers.token.classId.length - 1; i >= 0; i--) {
  //   		if(data.to == socket.handshake.headers.token.classId[i])
  //   			valid = true;
  //   	};
  //   	if(valid){
  //   		bcMessage = {
  //   			body : data.message,
  //   			from : userId,
  //   			toClass : data.to
  //   		}
  //   		messageModel.saveMessage(bcMessage,function(err,dbRes){
  //   			if(err)
		// 			console.log(new Error(err));//return next(new Error(err));
		// 		else{
		// 			console.log(dbRes);
		// 		}
  //   		});
	 //    	socket.broadcast.to(data.to)
	 //    	.emit('bcMessage', {
	 //    		to : data.to,
	 //    		from : userId,
	 //    		message : data.message
	 //    	});
  //   	}
  //   	else{
  //   		//something
  //   	}
  	});
    next();
}

module.exports = middleware;