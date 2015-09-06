function wdTileChooserDrct() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'wdTileChooserCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: '<div>+</div>',
  };
}

function wdTileChooserCtrl() {

}

wdTileChooserCtrl.$inject = [];

angular.module('web-dashboard')
  .controller('wdTileChooserCtrl', wdTileChooserCtrl)
  .directive('wdTileChooser', wdTileChooserDrct);
