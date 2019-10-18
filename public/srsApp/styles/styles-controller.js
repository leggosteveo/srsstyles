angular.module('srsApp').controller('StylesController', StylesController);

function StylesController($scope, productDataFactory) {
    productDataFactory.productList().then(function(response) {
        $scope.products = response.data;
    })

    $scope.lastCategory = null;
    $scope.isNewCategory = function (product)
    {   
        if ($scope.lastCategory != product.category)
            {
                $scope.lastCategory = product.category;
                return true;
            }

    return false;
    };


}