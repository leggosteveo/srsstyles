angular.module('srsApp').controller('SingleStyleController', SingleStyleController);

function SingleStyleController($scope, productDataFactory, cartDataFactory, $routeParams) {
    var id = $routeParams.id;
    productDataFactory.productDisplay(id).then(function(response) {
        $scope.product = response.data;
    })

    $scope.addToCart = function (id) {
        cartDataFactory.addOne(id);
    }
}