angular.module('srsApp').controller('SignUpController', SignUpController);

function SignUpController($scope, userDataFactory) {
   userDataFactory.getUser().then(function(response) {
       $scope.user = null;
   })
}