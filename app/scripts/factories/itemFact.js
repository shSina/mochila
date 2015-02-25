'use strict';
/**
*  Module
*
* Description
*/

angular
    .module('app')
    .factory('itemFact', ['$http','$state','$location','userFact',
        function ($http,$state,$location,userFact) {
            console.log('itemFact');

            var itemService = {};

            itemService.addItem = function (itemInput) {
                return $http
                    .post('http://localhost:9000/items/post',{
                            body:{message:itemInput},
                            authorType:'st',
                            itemType:'post'
                        },{headers: {'x-access-token': userFact.token}})
                    .then(function (success) {
                        // console.log(success);
                        return success;
                    },function(error){
                        console.log(error);
                        return error;
                    });
            };
            itemService.getItems = function(){
                return $http
                    .get('http://localhost:9000/stream',{
                            headers: {'x-access-token': userFact.token}
                        })
                    .then(function (success) {
                        // console.log(success);
                        return success;
                    },function(error){
                        console.log(error);
                        return error;
                    });
            }
            return itemService;
    }]);
