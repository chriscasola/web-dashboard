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
      `<wd-tile ng-repeat="tile in ctrl.getLayout().props.tiles" tile-id="::tile"></wd-tile>`,
      `<wd-tile-chooser></wd-tile-chooser>`,
    ].join('\n'),
  };
}

function wdContainerCtrl(wdLayouts) {
  this.getLayout = function() {
    return wdLayouts.model.get({id: this.layoutId()});
  };
}

wdContainerCtrl.$inject = ['wdLayouts'];

angular.module('web-dashboard')
  .controller('wdContainerCtrl', wdContainerCtrl)
  .directive('wdContainer', wdContainerDrct);
