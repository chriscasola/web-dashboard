function wdTileContentDrct() {
  return {
    restrict: 'E',
    scope: {
      tileModel: '&',
      onEdit: '&',
    },
    controller: 'wdTileContentCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<div class="wd-tile-header">Link<i class="fa fa-cog" ng-click="ctrl.onEdit()"></i></div>`,
      `<div class="wd-tile-body">`,
        `<a ng-href="{{ ctrl.tileModel().props.link }}">`,
          `<img ng-src="{{ ctrl.tileModel().props.imageUrl }}">`,
        `</a>`,
      `</div>`,
    ].join('\n'),
  };
}

function wdTileContentCtrl() {

}

angular.module('web-dashboard')
  .controller('wdTileContentCtrl', wdTileContentCtrl)
  .directive('wdTileContent', wdTileContentDrct);
