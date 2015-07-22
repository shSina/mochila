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


		factory.changeClass = function (edit) {
			return $http
			  .put('http://localhost:9000/admin/class/'+edit._id,{
				    	className:edit.className,
				    	startDate:edit.startDate,
				    	studentsCount:edit.studentsCount
			    	})
			  .then(function (success) {
				console.log(success);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};

		factory.changeUser = function (edit) {
			return $http
			  .put('http://localhost:9000/admin/user/'+edit._id,{
				    	userName:edit.userName				 })
			  .then(function (success) {
				console.log(success);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};


		factory.deleteClass = function (obj) {
			return $http
			  .delete('http://localhost:9000/admin/class/'+obj._id)
			  .then(function (success) {
				console.log(success);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};
		factory.deleteUser = function(obj){
			return $http
			  .delete('http://localhost:9000/admin/user/'+obj._id)
			  .then(function (success) {
				console.log(success);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};

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
		factory.addUser = function (obj) {
			return $http
			  .post('http://localhost:9000/admin/user',obj)
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
		factory.getAllUsers = function(){
				return $http
			  .get('http://localhost:9000/admin/user')
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				console.log(success);
				$rootScope.$emit('user:all',success.data);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		}
		return factory;
	}]);
