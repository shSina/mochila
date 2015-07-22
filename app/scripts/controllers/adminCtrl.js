'use strict';
/**
*  Module
*
* Description
*/
angular.module('app').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});

angular
    .module('app')
    .controller('adminCtrl', ['$scope','$rootScope','$state','$http','adminFact','eventFact',
        function($scope,$rootScope,$state,$http,adminFact,eventFact){

            $('ul.tabs').tabs();


            console.log('adminCtrl');
            $scope.classes = [];
            $scope.users = [];
            $scope.classModal = {};
            $scope.userModal = {};

            $scope.$watch('classes', function() {
                setTimeout(function(){
                    $('.dropdown-button').dropdown({
                            inDuration: 300,
                            outDuration: 225,
                            constrain_width: false, // Does not change width of dropdown to that of the activator
                            hover: false, // Activate on hover
                            gutter: 0, // Spacing from edge
                            belowOrigin: false // Displays dropdown below the button
                        }
                    );
                },300)
            });

            $scope.editClass = function(obj){
                $scope.classModal = obj;
            };
            $scope.editUser = function(obj){
                $scope.userModal = obj;
            }

            $scope.changeClass = function(){
                adminFact.changeClass($scope.classModal);
            };
             $scope.changeUser = function(){
                adminFact.changeUser($scope.userModal);
            };
            $scope.deleteClass = function(){
                adminFact.deleteClass($scope.classModal);
                
                setTimeout(function(){
                   adminFact.getAllClasses();
                },300);
            }
            $scope.deleteUser = function(){
                adminFact.deleteUser($scope.userModal);
                
                setTimeout(function(){
                   adminFact.getAllUsers();
                },300);
            }
            $scope.addClass = function(){
                adminFact.addClass($scope.classModal);
                
                setTimeout(function(){
                   adminFact.getAllClasses();
                },300);
            }
            $scope.addUser = function(){
                adminFact.addUser($scope.userModal);
                
                setTimeout(function(){
                    adminFact.getAllUsers();
                },300);
            }    

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

            $scope.person = {};
            $scope.people = [
                { name: 'Adam',      email: 'adam@email.com',      age: 10 },
                { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
                { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
                { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
                { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
                { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
                { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
                { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }];

    }]);
