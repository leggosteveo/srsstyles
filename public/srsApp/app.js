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
	.when('/styles/:id', {
		templateUrl:'srsApp/single-style/single-style.html',
		controller:SingleStyleController,
		controllerAs:'vm'
	})
	.when('/shopping-cart', {
		templateUrl:'srsApp/shopping-cart/shopping-cart.html',
		controller:ShoppingCartController,
		controllerAs:'vm'
	})
	.when('/signin', {
		templateUrl:'srsApp/signin/signin.html',
		controller:SignInController,
		controllerAs:'vm'
	})
	.when('/signup', {
		templateUrl:'srsApp/signup/signup.html',
		controller:SignUpController,
		controllerAs:'vm'
	})
	/*
	.when('/checkout', {
		templateUrl:'srsApp/checkout/checkout.html',
		controller:CheckoutController,
		controllerAs:'vm'
	}) */
	.otherwise({
		redirectTo:'/'
	});
}