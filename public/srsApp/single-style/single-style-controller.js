angular.module('srsApp').controller('SingleStyleController', SingleStyleController);

function SingleStyleController($scope, productDataFactory, $routeParams) {
    var id = $routeParams.id;
    productDataFactory.productDisplay(id).then(function(response) {
        $scope.product = response.data;
    })
}