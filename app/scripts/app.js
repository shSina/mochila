'use strict';

angular
    .module('app', ['ui.router','btford.socket-io','ui.select', 'ngSanitize'])
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
                    .state('words',{
                        url:'/words',
                        parent:'user',
                        templateUrl:'views/word.html',
                        controller:'wordCtrl'
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
		})
        skel.init({
          reset: 'full',
          containers: '100%',
          viewport:{
            scalable:false,
            height:'device-height'
          },
          breakpoints: {
            medium: {
              media: '(min-width: 769px) and (max-width: 1024px)'
            },
            small: {
              media: '(max-width: 768px)'
            }
          }
        });
    }]);
