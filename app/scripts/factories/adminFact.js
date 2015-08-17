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
			  .put(baseUrl+'/admin/class/'+edit._id,{
				    	className:edit.className,
				    	startDate:edit.startDate,
				    	teacherId:edit.teacherId
			    	})
			  .then(function (success) {
				console.log(success);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};
		factory.getClass = function (name) {
		return $http
		  .get('http://localhost:9000/admin/class/'+name)
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
				    	userName:edit.userName,
				    	email:edit.email
				    	// ,classIds:edit.classIds
			    	})
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
			  .delete(baseUrl+'/admin/class/'+obj._id)
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
			  .delete(baseUrl+'/admin/user/'+obj._id)
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
			  .post(baseUrl+'/admin/class',obj)
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
			  .post(baseUrl+'/admin/user',obj)
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
			  .get(baseUrl+'/admin/class')
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				// console.log(success);
				$rootScope.$emit('class:all',success.data);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });	
		}
		factory.getAllUsers = function(){
				return $http
			  .get(baseUrl+'/admin/user')
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				// console.log(success);
				$rootScope.$emit('user:all',success.data);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		}
		factory.getTeachers = function(){
				return $http
			  .get('http://localhost:9000/admin/user/teachers')
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				console.log(success);
				$rootScope.$emit('teachers:all',success.data);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		}
		return factory;
	}]);