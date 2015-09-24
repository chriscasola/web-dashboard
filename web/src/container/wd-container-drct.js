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
      `<wd-tile ng-repeat="tile in ctrl.getLayout().props.tiles" tile-id="::tile" on-delete="ctrl.deleteTile(tileId)"></wd-tile>`,
      `<wd-tile-chooser></wd-tile-chooser>`,
    ].join('\n'),
  };
}

function wdContainerCtrl(wdLayouts) {
  this.getLayout = function() {
    return wdLayouts.model.get({id: this.layoutId()});
  };

  this.deleteTile = function(tileId) {
    const layout = this.getLayout();
    layout.props.tiles = _.filter(layout.props.tiles, function(id) {
      return id !== tileId;
    });
  };
}

wdContainerCtrl.$inject = ['wdLayouts'];

angular.module('web-dashboard')
  .controller('wdContainerCtrl', wdContainerCtrl)
  .directive('wdContainer', wdContainerDrct);
