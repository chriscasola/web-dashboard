function wdContainerDrct() {
  return {
    restrict: 'E',
    scope: {
      layoutId: '&',
    },
    controller: 'wdContainerCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<wd-tile ng-repeat="tile in ctrl.tiles" tile-id="::tile"></wd-tile>`,
      `<wd-tile-chooser></wd-tile-chooser>`,
    ].join('\n'),
  };
}

function wdContainerCtrl(wdLayouts) {
  this.tiles = [];
  wdLayouts.listTiles(this.layoutId()).then(tiles => {
    this.tiles = tiles;
  });
}

wdContainerCtrl.$inject = ['wdLayouts'];

angular.module('web-dashboard')
  .controller('wdContainerCtrl', wdContainerCtrl)
  .directive('wdContainer', wdContainerDrct);
