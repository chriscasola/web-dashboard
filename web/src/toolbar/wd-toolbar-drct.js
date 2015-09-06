function wdToolbarDrct() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'wdToolbarCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<div>WD</div>`,
      `<div><wd-layout-select></wd-layout-select></div>`,
    ].join('\n'),
  };
}

function wdToolbarCtrl() {

}
wdToolbarCtrl.$inject = [];

angular.module('web-dashboard')
  .controller('wdToolbarCtrl', wdToolbarCtrl)
  .directive('wdToolbar', wdToolbarDrct);
