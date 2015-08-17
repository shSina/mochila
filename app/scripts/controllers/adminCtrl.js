'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .controller('adminCtrl', ['$scope','$rootScope','$state','$http','adminFact','eventFact',
        function($scope,$rootScope,$state,$http,adminFact,eventFact){

            $('ul.tabs').tabs();


            console.log('adminCtrl');
            $scope.classes = [];
            $scope.users = [];
            $scope.teachers = [];
            $scope.classModal = {};
            $scope.userModal = {};
            $scope.selectedClass = {};
            $scope.selectedTeacher = {};



            $scope.editClass = function(obj){
                $scope.classModal = obj;
            };
            $scope.editUser = function(obj){
                $scope.userModal = obj;
            }

            $scope.changeClass = function(){
                for (var i = $scope.users.length - 1; i >= 0; i--) {
                    if( $scope.users[i].userName == $scope.selectedTeacher.userName)
                    {
                        $scope.classModal.teacherId = $scope.users[i]._id;
                    }

                };
                adminFact.changeClass($scope.classModal);
                setTimeout(function(){
                    adminFact.getTeachers();
                    adminFact.getAllUsers();
                    adminFact.getAllClasses();

                },300);
            };
             $scope.changeUser = function(){
                // for (var i = $scope.classes.length - 1; i >= 0; i--) {
                //     if( $scope.classes[i].className == $scope.selectedClass.className)
                //     {
                //         $scope.userModal.classIds = [$scope.classes[i]._id]; 
                //     }
                // };
                adminFact.changeUser($scope.userModal);
                  setTimeout(function(){
                    adminFact.getTeachers();
                    adminFact.getAllUsers();
                    adminFact.getAllClasses();
                },300);
            };
            $scope.deleteClass = function(){
                adminFact.deleteClass($scope.classModal);
                
                setTimeout(function(){
                    adminFact.getAllClasses();
                    adminFact.getAllUsers();
                },300);
            }
            $scope.deleteUser = function(){
                adminFact.deleteUser($scope.userModal);
                
                setTimeout(function(){
                    adminFact.getAllUsers();
                    adminFact.getAllClasses();

                },300);
            }
            $scope.addUser = function(){

               for (var i = $scope.classes.length - 1; i >= 0; i--) {
                    if( $scope.classes[i].className == $scope.selectedClass.className)
                    {
                        $scope.userModal.classIds = [$scope.classes[i]._id];
                    }

                };

                adminFact.addUser($scope.userModal);
                
                setTimeout(function(){
                    adminFact.getTeachers();
                    adminFact.getAllUsers();
                    adminFact.getAllClasses();
                },300);
            }    

            adminFact.getTeachers();
            $rootScope.$on('teachers:all',function(event,results){
                // console.log(results);
                $scope.teachers = results.data;
            });
            adminFact.getAllClasses();
            $rootScope.$on('class:all',function(event,results){
                $scope.classes = results.data;
                setTimeout(function(){
                    $('.modal-trigger').leanModal();
                },300);
            });

            adminFact.getAllUsers();
            $rootScope.$on('user:all',function(event,results){
                // console.log(results);
                $scope.users = results.data;
                setTimeout(function(){
                    $('.modal-trigger').leanModal();
                },300);
            });
            $scope.addClass = function(){
                        // console.log("blaa ", $scope.selectedTeacher.userName);
                // for (var i = $scope.users.length - 1; i >= 0; i--) {
                //     if( $scope.users[i].userName == $scope.selectedTeacher.userName)
                //     {
                //         $scope.classModal.teacherId = $scope.users[i]._id;
                //     }

                // };
                adminFact.addClass($scope.classModal);
                
                setTimeout(function(){
                   adminFact.getAllClasses();
                },300);
            }

    }]);
