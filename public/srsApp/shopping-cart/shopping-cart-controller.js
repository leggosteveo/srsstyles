angular.module('srsApp').controller('ShoppingCartController', ShoppingCartController);

function ShoppingCartController($http, $rootScope, $scope, cartDataFactory) {
    $rootScope.$broadcast("UpdateCart");
    cartDataFactory.getOne().then(function(response) {
            $rootScope.products = response.data.products;
            $rootScope.totalPrice = response.data.totalPrice;
   });
   $scope.sessionId = '';
   var stripe = Stripe('pk_test_6fEziO8RDXgjwqu2PPoVAKQD007onrRQXu');
   $scope.makePurchase = function() {
       var handleResult = function(result) {
           if (result.error) {
                $scope.displayError = result.error.message;
            }
        };
       
       
       
       $http.post('api/makePurchase').then(function(response) {
        $scope.sessionId = response.data.sessionId;
        stripe
          .redirectToCheckout({
            sessionId: $scope.sessionId
          })
          .then(handleResult);
       });
   }
}
