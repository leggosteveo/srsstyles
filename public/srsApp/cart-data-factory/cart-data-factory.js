angular.module('srsApp').factory('cartDataFactory', cartDataFactory);

function cartDataFactory($http) {
  return {
    getCart: getCart,
    cartAddOne: cartAddOne
  };

  function getCart() {
    return $http.get('/api/cart').then(complete).catch(failed);
  }

  function cartAddOne(id) {
    return $http.get('api/cart/:id').then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}