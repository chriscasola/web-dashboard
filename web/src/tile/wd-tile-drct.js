function wdTileDrct() {
  return {
    restrict: 'E',
    scope: {
      tileId: '&',
    },
    controller: 'wdTileCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<div class="wd-tile-header">Tile Header<i class="fa fa-cog"></i></div>`,
      `<div class="wd-tile-body">`,
        `<a ng-href="{{ ctrl.model.props.link }}">`,
          `<img ng-src="{{ ctrl.model.props.imageUrl }}">`,
        `</a>`,
      `</div>`,
    ].join('\n'),
  };
}

function wdTileCtrl(wdTiles) {
  wdTiles.model.getAsync({id: this.tileId()}).then(model => {
    this.model = model;
  });
}

wdTileCtrl.$inject = ['wdTiles'];

angular.module('web-dashboard')
  .controller('wdTileCtrl', wdTileCtrl)
  .directive('wdTile', wdTileDrct);
