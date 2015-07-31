'use strict';
/**
*  Module
*
* Description
*/

angular
    .module('app')
    .factory('itemFact', ['$http','$state','$location','userFact','eventFact',
        function ($http,$state,$location,userFact,eventFact) {
            console.log('itemFact');

            var itemService = {};

            itemService.addItem = function (itemInput) {
                return $http
                    .post(baseUrl+'/items/post',{
                            body:{message:itemInput},
                            authorType:'st',
                            itemType:'post'
                            // classId:
                        },{headers: {'x-access-token': userFact.token}})
                    .then(function (success) {
                        // console.log(success);
                        eventFact.sio.emit('additem');
                        return success;
                    },function(error){
                        console.log(error);
                        return error;
                    });
            };
            itemService.getItems = function(){
                return $http
                    .get(baseUrl+'/stream',{
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

            itemService.addWord = function (wordInput , defInput) {
                return $http
                    .post('http://localhost:9000/items/word',{
                            body:{word:wordInput ,
                                  definition:defInput},
                            authorType:'st',
                            itemType:'word'
                            // classId:
                        },{headers: {'x-access-token': userFact.token}})
                    .then(function (success) {
                        // console.log(success);
                        eventFact.sio.emit('addword');
                        return success;
                    },function(error){
                        console.log(error);
                        return error;
                    });
            };
            itemService.getWords = function(){
                return $http
                    .get('http://localhost:9000/items/word',{
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
