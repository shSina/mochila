'use strict';
/**
*  Module
*
* Description
*/
angular
	.module('app')
	.controller('authCtrl', ['$scope','$rootScope','$state','$http','userFact',
	  	function($scope,$rootScope,$state,$http,userFact){
			console.log('authCtrl');
			$scope.login = function(loginInput) {
				console.log(loginInput);
				userFact.login(loginInput);
			}
	}]);