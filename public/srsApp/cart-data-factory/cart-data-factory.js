angular.module('srsApp').factory('cartDataFactory', cartDataFactory);

function cartDataFactory($http) {
  return {
    getOne: getOne,
    addOne: addOne
  };

  function getOne() {
    return $http.get('/api/cart').then(complete).catch(failed);
  }

  function addOne(id) {
    return $http.post('/api/cart/add-to-cart/' + id).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}