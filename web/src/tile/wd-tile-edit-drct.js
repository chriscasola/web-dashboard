function wdTileEditDrct() {
  return {
    restrict: 'E',
    scope: {
      tileModel: '&',
      onDone: '&',
    },
    controller: 'wdTileEditCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<p>Link: <input type="text" ng-model="ctrl.tileModel().props.link"></p>`,
      `<p>Image: <input type="text" ng-model="ctrl.tileModel().props.imageUrl"></p>`,
      `<button ng-click="ctrl.onDone()">Done</button>`,
    ].join('\n'),
  };
}

function wdTileEditCtrl() {

}

angular.module('web-dashboard')
  .controller('wdTileEditCtrl', wdTileEditCtrl)
  .directive('wdTileEdit', wdTileEditDrct);
