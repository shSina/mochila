'use strict';
var baseUrl = 'http://192.168.1.7:9000';

angular
    .module('app', ['ui.router','btford.socket-io','ui.select','ngFileUpload'])
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
                .state('user',{
                    templateUrl:'views/userMain.html',
                    controller:'userCtrl',
                    abstract:true,
                    resolve:{
                        userMyInfo:['userFact','eventFact',function(userFact,eventFact){
                            userFact.loadToken();
                            userFact.getMyFriends();
                            eventFact.start();
                            return userFact.getMyInfo();
                        }]
                    }
                })
                    .state('stream',{
                        url:'/',
                        parent:'user',
                        templateUrl:'views/stream.html',
                        controller:'streamCtrl'
                    })
                .state('admin',{
                    url:'/admin',
                    templateUrl:'views/admin.html',
                    controller:'adminCtrl',
                })
    }])
    .run(['$state','$rootScope','$timeout',function($state,$rootScope,$timeout){
        $rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
                if(localStorage.getItem('k') !== null && toState.name =='auth'){
                    event.preventDefault();
                    $state.go('stream');
                }
		});
    }]);
