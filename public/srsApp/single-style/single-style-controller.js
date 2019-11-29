angular.module('srsApp').controller('SingleStyleController', SingleStyleController);

function SingleStyleController($rootScope, $scope, productDataFactory, cartDataFactory, $location, $routeParams) {
    var id = $routeParams.id;
    productDataFactory.productDisplay(id).then(function(response) {
        $scope.product = response.data;
    })

    

    $scope.addToCart = function () {
        id = $routeParams.id;
        /* var item = {
            id: $scope.product._id,
            name: $scope.product.name,
            price: $scope.product.price,
            description: $scope.product.description,
            bust: $scope.bust,
            waist: $scope.waist,
            hip: $scope.hip
        }; */
        var measurements = {
            bust: $scope.bust,
            waist: $scope.waist,
            hip: $scope.hip,
        }

        cartDataFactory.addOne(id, measurements).then(function(response) {
        });
        $rootScope.$broadcast("UpdateCart");
        setTimeout(function(){
        $location.path('/shopping-cart');
           }, 10)    
    }
}