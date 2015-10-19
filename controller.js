'use strict';

var app = angular.module('mainApp',['ngRoute', 'ui.bootstrap', 'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		
		templateUrl: 'login.html'
	})
	.when('/phones', {
		
		templateUrl: 'partials/phone-list.html',
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope) {
				if(!$rootScope.logged){
					$location.path("/");
				}		
			}
		},
		redirectTo: '/phones'
	})
	.when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
    })
    .when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
    })
	.otherwise({
		redirectTo: '/'
	});
});

app.factory('usuarioTipoService', function($http){
	var getUserTipo = function(){
		var myUrl = "http://127.0.0.1/AngularJs2"
		return $http.get(myUrl + "/contas.json").success(function(response){
			return response.tipo
		});
	};
	return { getUserTipo: getUserTipo };
});
app.controller('loginCtrl', function($scope, $location, $rootScope, usuarioTipoService){
	$scope.submit = function(){
		var myDataPromisse = usuarioTipoService.getUserTipo();
		myDataPromisse.then(function(response){
			//console.log(response.data.tipo);
			if(response.data.tipo === 'Descritor'){
			$rootScope.logged = true;
			$location.path('/dashboard');
			}
			else{
				alert("nop");
			}
		})
	};
});