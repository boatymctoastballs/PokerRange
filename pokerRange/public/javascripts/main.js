var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

 app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
 	$urlRouterProvider.otherwise('/');

 	$stateProvider
 	.state('home',{
 		url: '/',
 		templateUrl : '/templates/home.html',
 		controller: 'ctrl1'
 	})
 	.state('newGame',{
 		url: '/',
 		templateUrl : '/templates/game.html',
 		controller: 'ctrl1'
 	})
 }]);