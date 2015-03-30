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
			if(localStorage.getItem('k') !== null)
				return $state.go('stream');
			            $('ul.tabs').tabs();

			console.log('authCtrl');
			$scope.login = function(loginInput) {
				console.log(loginInput);
				userFact.login(loginInput);
			}
			$scope.scroll = function(scrollTo){
				console.log(scrollTo);
				$('body').animate({scrollTop: $('#'+scrollTo).offset().top}, 3000);

			}
	}]);
