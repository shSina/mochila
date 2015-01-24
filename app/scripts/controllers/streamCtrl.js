'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('streamCtrl', ['$scope','$rootScope','$state','$http','userFact','itemFact',
        function($scope,$rootScope,$state,$http,userFact,itemFact){
            console.log('streamCtrl');
            $scope.items = [];

            $scope.addItem = function(postInput) {
                console.log(postInput);
                itemFact.addItem(postInput);
            }
            $scope.getItems = function(){
                itemFact.getItems().then(function(data){
                    $scope.items = data.data.data;
                });

            }
    }]);
