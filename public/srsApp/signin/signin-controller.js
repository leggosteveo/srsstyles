angular.module('srsApp').controller('SignInController', SignInController);

function SignInController($scope, userDataFactory) {
   userDataFactory.getUser().then(function(response) {
       $scope.user = null;
   })
}