'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('streamCtrl', ['$scope','$rootScope','$state','$http','userFact','itemFact','eventFact',
        function($scope,$rootScope,$state,$http,userFact,itemFact,eventFact){
            console.log('streamCtrl');
            $scope.items = [];

            // eventFact.emit('createRoom',{to:'54ece3a7058cd48622672e9c'});
            // eventFact.emit('toMessage',{message:"testing",to:'54ece3a7058cd48622672e9c'});
            // eventFact.on('toMessage',function(msg){
            //     console.log(msg)
            // })
            //  eventFact.on('test',function(msg){
            //     console.log(msg)
            // })
            $scope.addItem = function(postInput) {
                console.log(postInput);
                itemFact.addItem(postInput.text);
            }
            $scope.getItems = function(){
                itemFact.getItems()
                    .then(function (success) {
                        if(!success.data)
                            return;
                        $scope.items = success.data.data;
                    });

            }
            eventFact.on('newItem', function () {
                $scope.getItems();
            });
    }]);
