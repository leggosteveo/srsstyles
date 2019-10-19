angular.module('srsApp').controller('ShoppingCartController', ShoppingCartController);

function ShoppingCartController($scope, cartDataFactory) {
   cartDataFactory.getCart().then(function(response) {
       $scope.products = response.data.products;
       $scope.totalPrice = response.data.totalPrice;
   })
}
