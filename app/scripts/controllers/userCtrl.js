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
                //check if not exist
                $scope.chats.push({to:friend,
                            logs:[],
                            messages:[]});
            }

            $scope.sendMessage = function(message , friend){
                console.log(message,friend);
                eventFact.emit('message',{text:message,to:friend});
                $scope.field = '';
            }

            $rootScope.$on('message',function(event , data){
                console.log(data);
                // if($scope.chats)
                    $scope.chats[0].messages.push({text:data.from});
                // else{
                    // $scope.chats.push({to:friend,
                    //         logs:[],
                    //         messages:[]});
                    // $scope.chats[0].messages.push({text:data.text});
                // }
            });
            // eventFact.on('test',function(msg){
            //     console.log(msg)
            // })
            // eventFact.on('something', function () {
            //     $scope.getItems();
            // });
    }]);
