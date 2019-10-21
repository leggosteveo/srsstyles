angular.module('srsApp').controller('NavController', NavController);

function NavController($scope, cartDataFactory) {
   cartDataFactory.getOne().then(function(response) {
       $scope.cart = response;
   })
}