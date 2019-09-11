angular.module('srsApp',['ngRoute']).config(config) ;
function config($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'srsApp/home/home.html',
		controller:HomeController,
		controllerAs:'vm'
	})
	.when('/firstPage', {
		templateUrl:'srsApp/firstPage/firstPage.html',
		controller:FirstPageController,
		controllerAs:'vm'
	})
	.when('/styles', {
		templateUrl:'srsApp/styles/styles.html',
		controller:StylesController,
		controllerAs:'vm'
	})
	.otherwise({
		redirectTo:'/'
	});
}