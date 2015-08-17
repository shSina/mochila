'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('streamCtrl', ['$sce','$scope','$rootScope','$state','$http','userFact','itemFact','eventFact','Upload', 'userMyInfo',
        function($sce,$scope,$rootScope,$state,$http,userFact,itemFact,eventFact,Upload,userMyInfo){
            console.log('streamCtrl');
            $scope.items = [];
            $scope.baseUrl = baseUrl;
            $scope.postItem = '';
            $scope.postImage = '';
            $scope.postAudio = '';
            $scope.user = userMyInfo.data.data;
            console.log("user Type " + $scope.user.type);
            
           $scope.audio = function(){
                $(".addaudio").removeClass('inactive');
                $(".addimage").addClass('inactive');
                $(".additem").addClass('inactive');
            }
            $scope.photo = function() {
                $(".addimage").removeClass('inactive');
                $(".addaudio").addClass('inactive');
                $(".additem").addClass('inactive');
            }
            $scope.text = function() {
                $(".additem").removeClass('inactive');
                $(".addimage").addClass('inactive');
                $(".addaudio").addClass('inactive');
            }

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
                console.log('asdfasd');
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
             $scope.shareAudio = function(){
                // $scope.fileAudio = $sce.trustAsResourceUrl(fileAudio);
                Upload.upload({
                    url: baseUrl+'/items/audio',
                    fields: {'message': $scope.postAudio},
                    file: $scope.fileAudio,
                    headers:{'x-access-token': userFact.token}
                }).progress(function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    $scope.fileAudio = null;
                    $scope.postAudio = '';
                    eventFact.sio.emit('additem');
                    // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    $scope.postAudio = '';
                    $scope.fileAudio = null;
                    console.log('error status: ' + status);
                });
            }
    }]);