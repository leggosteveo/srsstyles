angular.module('srsApp').controller('NavController', NavController);

function NavController($rootScope, $scope, cartDataFactory) {
   
   /* $scope.totalQty = $rootScope.totalQty;
   
   $rootScope.$on("UpdateCart",
    function () {
        $scope.totalQty = $rootScope.totalQty;
    }) */
   
   
    cartDataFactory.getOne().then(function(response) {
       $rootScope.totalQty = response.data.totalQty;
   })

   $rootScope.$on("UpdateCart",
    function () {
        cartDataFactory.getOne().then(function(response) {
            $rootScope.totalQty = response.data.totalQty;
            // $rootScope.$apply();                        
        })
    })
}