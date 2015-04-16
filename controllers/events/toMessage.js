var middleware = function(socket,next){
	socket.on('toMessage', function(data){
		// if( sockets[data.to] && sockets[data.to].socket){
		// 	userModel.isFriend(data.to,classIds,function(err,res){
		// 		if(err)
		// 			console.log(new Error(err));//return next(new Error(err));
		// 		else{
		// 			if(res >= 1)
		// 			{
		// 				toMessage = {
		// 				body : data.message,
		// 				from : userId,
		// 				toUser : data.to
		// 				}
		// 				messageModel.saveMessage(toMessage,function(err,dbRes){
		// 					if(err)
		// 						console.log(new Error(err));//return next(new Error(err));
		// 					else{
		// 						console.log(dbRes);
		// 					}
		// 				});
		// 				sockets[data.to].socket.forEach(function(value){
		// 					value.emit('toMessage', 
		// 					{ 
		// 						from : userId,
		// 						message : data.message
		// 					});
		// 				});
		// 			}
		// 		}
		// 	});
		// }
	});
	next();
}

module.exports = middleware;