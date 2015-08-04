'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('wordCtrl', ['$scope','$rootScope','$state','$http','userFact','itemFact','eventFact',
        function($scope,$rootScope,$state,$http,userFact,itemFact,eventFact){
            console.log('wordCtrl');
            $scope.words = [];
            $scope.newWord = '';
            $scope.newDef = '';

            $scope.addWord = function() {
                // console.log($scope.postItem);
                itemFact.addWord($scope.newWord , $scope.newDef);
            }
            
            itemFact.getWords()
                    .then(function (success) {
                        if(!success.data)
                            return;
                        $scope.words = success.data.data;
                        console.log($scope.words);
                    });

            eventFact.sio.on('newWord',function(obj){
                itemFact.getWords()
                    .then(function (success) {
                        if(!success.data)
                            return;
                        $scope.words = success.data.data;
                    });
                // console.log('newitem');
            });
    }]);