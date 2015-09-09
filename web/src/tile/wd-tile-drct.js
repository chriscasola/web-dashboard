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
      `<wd-tile-content tile-model="ctrl.model" on-edit="ctrl.edit()" ng-if="!ctrl.inEditMode"></wd-tile-content>`,
      `<wd-tile-edit tile-model="ctrl.model" on-done="ctrl.done()" ng-if="ctrl.inEditMode"></wd-tile-edit>`,
    ].join('\n'),
  };
}

function wdTileCtrl(wdTiles) {
  this.inEditMode = false;
  wdTiles.model.getAsync({id: this.tileId()}).then(model => {
    this.model = model;
  });
}

wdTileCtrl.prototype.edit = function() {
  this.inEditMode = true;
};

wdTileCtrl.prototype.done = function() {
  this.inEditMode = false;
  // this.model.save(); TODO
};

wdTileCtrl.$inject = ['wdTiles'];

angular.module('web-dashboard')
  .controller('wdTileCtrl', wdTileCtrl)
  .directive('wdTile', wdTileDrct);
