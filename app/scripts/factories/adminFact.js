'use strict';
/**
*  Module
*
* Description
*/

angular
	.module('app')
	.factory('adminFact',['$http','$state','$location' ,'$rootScope', 
		function ($http,$state,$location,$rootScope) {
		console.log('adminFact');
		var factory = {};

		factory.addClass = function (obj) {
			return $http
			  .post('http://localhost:9000/admin/class',obj)
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				console.log(success);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};
		factory.getAllClasses = function(){
			return $http
			  .get('http://localhost:9000/admin/class')
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				console.log(success);
				$rootScope.$emit('class:all',success.data);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });	
		}
		return factory;
	}]);
