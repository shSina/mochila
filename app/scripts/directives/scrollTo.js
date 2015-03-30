'use strict';
/**
*  Module
*
* Description
*/
angular
    .module('app')
    .directive('scrollTo',
        function(){
        	console.log("here!");
        	var linkFunction = function(scope, element, attributes) {
    			scope.text = attributes["scrollTo"];
    			console.log(scope.text);
				$('body').animate({scrollTop: $('#'+scope.text).offset().top}, 3000);
  			};
  			
			return {
				restrict: "A",
				// template: "<p></p>",
				link: linkFunction
			};       
    });