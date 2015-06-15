'use strict';
/**
*  Module
*
* Description
*/

angular
    .module('app')
    .factory('eventFact',['$http','$state','socketFactory','userFact','$rootScope',
        function ($http,$state,socketFactory,userFact,$rootScope) {
            console.log('eventFact');
            var sio = io.connect('localhost:9000',{query:'name='+userFact.token})
            var socket = socketFactory({
                ioSocket: sio
            });

            sio.on('error', function (reason){
				console.error('Unable to connect Socket.IO', reason);
			});
            sio.on('message',function(obj){
                console.log(obj);
                $rootScope.$emit('message',{text:obj.message,from:obj.from});
            })
            // socket.emit('hello',{rest:"asf"});
            return socket;
    }]);
