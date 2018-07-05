var app = angular.module('app', ['ui.bootstrap', 'ui.router']);

 app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
 	$urlRouterProvider.otherwise('/');

 	$stateProvider
 	.state('home',{
 		url: '/',
 		templateUrl : '/templates/home.html',
 		controller: 'home'
 	})
 	.state('newGame',{
 		url: '/game',
 		templateUrl : '/templates/game.html',
 		controller: 'game'
 	})
 }]);