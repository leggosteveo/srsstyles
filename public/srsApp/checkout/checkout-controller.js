angular.module('srsApp').controller('CheckOutController', CheckOutController);

function CheckOutController($scope, cartDataFactory) {
   /* userDataFactory.getUser().then(function(response) {
       $scope.user = null;
   }) */


   cartDataFactory.getOne().then(function(response) {
    $scope.totalPrice = response.data.totalPrice;
    })

    Stripe.setPublishableKey('pk_test_m6ZWLYyvkUAqJzr1fvr1uRj2fillMePlease');
    $scope.handleStripe = function(status, response){
        if(response.error) {
          // there was an error. Fix it.
        } else {
          // got stripe token, now charge it or smt
          token = response.id
        }
      }
}