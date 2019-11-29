angular.module('srsApp').factory('userDataFactory', userDataFactory);

function userDataFactory($http) {
  return {
    userList: userList,
    getUser: getUser
  };

  function userList() {
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function getUser(id) {
    return $http.get('/api/users/' + id).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}