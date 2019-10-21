angular.module('srsApp').controller('CheckoutController', CheckoutController);

function CheckoutController($scope, userDataFactory) {
   userDataFactory.getUser().then(function(response) {
       $scope.user = null;
   })
}