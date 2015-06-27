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
            console.log('adminCtrl');
            $scope.classes = [];
            $scope.classModal = {};
            $scope.editClass = function(obj){
                $scope.classModal =obj;
            };

            adminFact.getAllClasses();
            $rootScope.$on('class:all',function(event,results){
                // console.log(results);
                $scope.classes = results.data;
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
