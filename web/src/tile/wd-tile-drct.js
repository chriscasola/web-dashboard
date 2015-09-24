function wdTileDrct() {
  return {
    restrict: 'E',
    scope: {
      tileId: '&',
      onDelete: '&',
    },
    controller: 'wdTileCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<wd-tile-content tile-model="ctrl.model" on-edit="ctrl.edit()" on-delete="ctrl.delete()" ng-if="!ctrl.inEditMode"></wd-tile-content>`,
      `<wd-tile-edit tile-model="ctrl.model" on-done="ctrl.done()" ng-if="ctrl.inEditMode"></wd-tile-edit>`,
    ].join('\n'),
  };
}

function wdTileCtrl(wdTiles, wdNotifier) {
  this.wdNotifier = wdNotifier;
  this.inEditMode = false;
  wdTiles.model.getAsync({id: this.tileId()}).then(model => {
    this.model = model;
  });
}

wdTileCtrl.prototype.edit = function() {
  this.inEditMode = true;
};

wdTileCtrl.prototype.delete = function() {
  this.model.delete();
  this.onDelete({tileId: this.tileId()});
};

wdTileCtrl.prototype.done = function() {
  this.inEditMode = false;
  this.model.save().then(() => {
    this.wdNotifier.notify({
      header: 'Save Complete',
      body: 'The tile has been saved.',
    });
  });
};

wdTileCtrl.$inject = ['wdTiles', 'wdNotifier'];

angular.module('web-dashboard')
  .controller('wdTileCtrl', wdTileCtrl)
  .directive('wdTile', wdTileDrct);
