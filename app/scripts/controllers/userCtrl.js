'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('userCtrl', ['$scope','$rootScope','$state','userFact','eventFact','userMyInfo',
        function($scope,$rootScope,$state,userFact,eventFact,userMyInfo){
            console.log('userCtrl');
            console.log(userMyInfo.data);
            console.log(userFact.friends);
            $scope.user = userMyInfo.data.data;
            $scope.friends = userFact.friends;
            $scope.chats = [];

            $scope.startChat = function(friend){
                console.log(friend);
                $scope.chats.push({to:friend,
                            logs:[],
                            messages:[{friend:'asd'},{}]});
            }
            // eventFact.emit('hello',{salam:1});
            // eventFact.on('test',function(msg){
            //     console.log(msg)
            // })
            // eventFact.on('something', function () {
            //     $scope.getItems();
            // });
    }]);
