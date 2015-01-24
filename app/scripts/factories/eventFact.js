'use strict';
/**
*  Module
*
* Description
*/

angular
    .module('app')
    .factory('eventFact',['$http','$state','socketFactory',
        function ($http,$state,socketFactory) {
            console.log('eventFact');

            var socket = socketFactory({
                ioSocket: io.connect('localhost:9000')
            });
            return socket;
    }]);
