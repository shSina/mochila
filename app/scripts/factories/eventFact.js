'use strict';
/**
*  Module
*
* Description
*/

angular
    .module('app')
    .factory('eventFact',['$http','$state','socketFactory','userFact',
        function ($http,$state,socketFactory,userFact) {
            console.log('eventFact');
            var sio = io.connect('localhost:9000',{query:'name='+userFact.token})
            var socket = socketFactory({
                ioSocket: sio
            });

            sio.on('error', function (reason){
				console.error('Unable to connect Socket.IO', reason);
			});
            return socket;
    }]);
