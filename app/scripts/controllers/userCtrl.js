'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('userCtrl', ['$scope','$rootScope','$state','userFact','eventFact',
        function($scope,$rootScope,$state,userFact,eventFact){
            console.log('userCtrl');

            // eventFact.emit('hello',{salam:1});
            eventFact.on('test',function(msg){
                console.log(msg)
            })
            eventFact.on('something', function () {
                $scope.getItems();
            });
    }]);
