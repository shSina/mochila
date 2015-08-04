'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('streamCtrl', ['$scope','$rootScope','$state','$http','userFact','itemFact','eventFact','Upload',
        function($scope,$rootScope,$state,$http,userFact,itemFact,eventFact,Upload){
            console.log('streamCtrl');
            $scope.items = [];
            $scope.baseUrl = baseUrl;
            $scope.postItem = '';
            $scope.postImage = '';

            $scope.shareItem = function() {
                // console.log($scope.postItem);
                itemFact.addItem($scope.postItem);
                $scope.postItem = '';
            }
            
            itemFact.getItems()
                    .then(function (success) {
                        if(!success.data)
                            return;
                        $scope.items = success.data.data;
                        console.log($scope.items[0]);
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
            $scope.shareImage = function(){
                Upload.upload({
                    url: baseUrl+'/items/image',
                    fields: {'message': $scope.postImage},
                    file: $scope.fileImage,
                    headers:{'x-access-token': userFact.token}
                }).progress(function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.fileImage = null;
                    $scope.postImage = '';
                    eventFact.sio.emit('additem');
                    // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    $scope.postImage = '';
                    $scope.fileImage = null;
                    console.log('error status: ' + status);
                });
            }
    }]);