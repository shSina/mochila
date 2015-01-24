'use strict';
/**
*  Module
*
* Description
*/

angular
    .module('app')
    .factory('itemFact', function ($http,$state,$location,socketFactory) {
        console.log('itemFact');
        // var socket = socketFactory();
        // socket('http://localhost:9000');

        var itemService = {};
        var token = localStorage.getItem('k');

        itemService.addItem = function (itemInput) {
            return $http
                .post('http://localhost:9000/item',{
                        body:itemInput,
                        authorType:'st',
                        itemType:'sPost'
                    },{headers: {'x-access-token': token}})
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
                .get('http://localhost:9000/item',{headers: {'x-access-token': token}})
                .then(function (success) {
                    console.log(success);
                    return success;
                },function(error){
                    console.log(error);
                    return error;
                });
        }
        return itemService;
    });
