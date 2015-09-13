function wdLayoutFact($http, smModelFactory) {
  const model = smModelFactory('/layouts/:id').done();

  return {
    list: function() {
      return $http.get('/layouts').then(function(response) {
        return response.data;
      });
    },
    model: model,
  };
}

wdLayoutFact.$inject = ['$http', 'smModelFactory'];

angular.module('web-dashboard').factory('wdLayouts', wdLayoutFact);
