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
            $scope.postItem = '';

            $scope.addItem = function() {
                // console.log($scope.postItem);
                itemFact.addItem($scope.postItem);
            }
            
            itemFact.getItems()
                    .then(function (success) {
                        if(!success.data)
                            return;
                        $scope.items = success.data.data;
                    });

            eventFact.sio.on('newItem',function(obj){
                itemFact.getItems()
                    .then(function (success) {
                        if(!success.data)
                            return;
                        $scope.items = success.data.data;
                    });
                // console.log('newitem');
            });
    }]);