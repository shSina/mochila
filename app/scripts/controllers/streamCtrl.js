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

            eventFact.emit('hello',{salam:1});

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
