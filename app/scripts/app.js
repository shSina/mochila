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
