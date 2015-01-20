'use strict';

angular
    .module('app', ['ui.router'])
    .config(['$urlRouterProvider','$stateProvider','$locationProvider',
        function($urlRouterProvider,$stateProvider,$locationProvider){
            $urlRouterProvider.otherwise('/');
            	$locationProvider.html5Mode(true).hashPrefix('!');

            $stateProvider
                .state('auth',{
                	url:'/',
                	templateUrl:'views/auth.html',
                	controller:'authCtrl'
                })
    }]);