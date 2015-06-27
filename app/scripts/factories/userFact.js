'use strict';
/**
*  Module
*
* Description
*/

angular
	.module('app')
	.factory('userFact',['$http','$state','$location', function ($http,$state,$location) {
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
				localStorage.setItem('k',success.data.token);
				authService.loadToken();
				$state.go('stream');
			    return success;
			  },function(error){
			  	console.log(error);
			  	return error;
			  });
		};
		authService.getMyInfo = function(){
			return $http
				.get('http://localhost:9000/user',{
					headers: {'x-access-token': authService.token}
				});
		}
		authService.getMyFriends = function(){
			return $http
				.get('http://localhost:9000/user/friends',{
					headers: {'x-access-token': authService.token}
				})
				.then(function (success) {
					console.log(success);
					authService.friends = success.data.data;
					return success;
				},function(error){
					console.log(error);
					return error;
				});
		}
		authService.loadToken = function(){
			authService.token = localStorage.getItem('k');
		}

		return authService;
	}]);
