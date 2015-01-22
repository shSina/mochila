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
            $scope.addItem = function(postInput) {
                console.log(postInput);
                itemFact.addItem(postInput);
            }
    }]);
