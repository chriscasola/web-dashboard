function wdTileChooserDrct() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'wdTileChooserCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: '<div><i class="fa fa-plus" ng-click="ctrl.addTile()"></i></div>',
  };
}

function wdTileChooserCtrl($routeParams, wdTiles, wdLayouts) {
  this.addTile = function() {
    wdTiles.model.create().then(tile => {
      wdLayouts.model.getAsync({id: $routeParams.layoutId}).then(layout => {
        layout.props.tiles.push(tile.props.id);
        layout.save();
      });
    });
  };
}

wdTileChooserCtrl.$inject = ['$routeParams', 'wdTiles', 'wdLayouts'];

angular.module('web-dashboard')
  .controller('wdTileChooserCtrl', wdTileChooserCtrl)
  .directive('wdTileChooser', wdTileChooserDrct);
