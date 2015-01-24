'use strict';

angular
    .module('app', ['ui.router','btford.socket-io'])
    .config(['$urlRouterProvider','$stateProvider','$locationProvider',
        function($urlRouterProvider,$stateProvider,$locationProvider){
            $urlRouterProvider.otherwise('/');
            	$locationProvider.html5Mode(true).hashPrefix('#');

            $stateProvider
                .state('auth',{
                	url:'/',
                	templateUrl:'views/auth.html',
                	controller:'authCtrl'
                })
                .state('stream',{
                    url:'/',
                    templateUrl:'views/stream.html',
                    controller:'streamCtrl'
                })
    }])
    .run(['$state',function($state){
        // $state.go('stream');
        // if(localStorage.getItem('k') !== null)
        //     $state.go('stream');
    }]);
