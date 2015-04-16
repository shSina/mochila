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
                .state('user',{
                    templateUrl:'views/userMain.html',
                    controller:'userCtrl',
                    abstract:true,
                    resolve:{
                        userMyInfo:['userFact',function(userFact){
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
