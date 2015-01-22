'use strict';
/**
*  Module
*
* Description
*/

angular
	.module('app')
	.factory('userFact', function ($http,$state,$location) {
		console.log('userFact');
		var authService = {};

		authService.login = function (loginInput) {
			return $http
			  .post('http://localhost:9000/auth/signin',{
				    	email:loginInput.email,
				    	password:loginInput.password
			    	})
			    	// },{headers: {'auth-type': 0}})
			  .then(function (success) {
				console.log(success);
				$state.go('stream');
				localStorage.setItem('k',success.data.token);
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};
		return authService;
	});
