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
            var factory ={};
            factory.start = function(){
                var sio = io.connect(baseUrl,{query:'name='+userFact.token})
                factory.socket = socketFactory({
                    ioSocket: sio
                });
                sio.on('error', function (reason){
    				console.error('Unable to connect Socket.IO', reason);
    			});
                sio.on('message',function(obj){
                    console.log('message',obj);
                    $rootScope.$emit('message',{text:obj.message,from:obj.from});
                });
                sio.on('allclass',function(obj){
                    // console.log('message',obj);
                    $rootScope.$emit('allclass',{text:obj.message,from:obj.from});
                });
                factory.sio = sio;
            };
            // socket.emit('hello',{rest:"asf"});
            return factory;
    }]);
