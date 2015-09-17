function wdTileFact($http, smModelFactory, SMModelInstance) {
  class TileModelInstance extends SMModelInstance {
    constructor(config) {
      super(config);
      if (!this.props.imageUrl && !this.props.link) {
        this.props.imageUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
        this.props.link = 'http://www.google.com/';
      }
    }
  }

  const model = smModelFactory('/tiles/:id')
    .modelInstance(TileModelInstance)
    .done();

  return {
    list: function() {
      return $http.get('/tiles').then(function(response) {
        return response.data;
      });
    },
    model: model,
  };
}

wdTileFact.$inject = ['$http', 'smModelFactory', 'SMModelInstance'];

angular.module('web-dashboard').factory('wdTiles', wdTileFact);
