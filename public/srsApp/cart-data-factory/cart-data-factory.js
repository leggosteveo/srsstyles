angular.module('srsApp').factory('cartDataFactory', cartDataFactory);

function cartDataFactory($http) {
  return {
    getOne: getOne,
    addOne: addOne
  };

  function getOne() {
    return $http.get('/api/cart').then(complete).catch(failed);
  }

  function addOne(id, measurements) {
    return $http.get('/api/cart/add-to-cart/' + id, measurements).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}
