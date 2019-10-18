angular.module('srsApp').factory('productDataFactory', productDataFactory);

function productDataFactory($http) {
  return {
    productList: productList,
    productDisplay: productDisplay,
    postReview: postReview
  };

  function productList() {
    return $http.get('/api/products?count=10').then(complete).catch(failed);
  }

  function productDisplay(id) {
    return $http.get('/api/products/' + id).then(complete).catch(failed);
  }

  function postReview(id, review) {
    return $http.post('/api/products/' + id + '/reviews', review).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}