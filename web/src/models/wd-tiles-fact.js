function wdTileFact($http, smModelFactory) {
  const model = smModelFactory('/tiles/:id').done();

  return {
    list: function() {
      return $http.get('/tiles').then(function(response) {
        return response.data;
      });
    },
    model: model,
  };
}

wdTileFact.$inject = ['$http', 'smModelFactory'];

angular.module('web-dashboard').factory('wdTiles', wdTileFact);
