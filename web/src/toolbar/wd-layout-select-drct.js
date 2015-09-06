function wdLayoutSelectDrct() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'wdLayoutSelectCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      `<select ng-model="ctrl.layoutId" ng-model-options="{getterSetter: true}">`,
        `<option ng-repeat="option in ctrl.layouts track by option.id" value="{{ option.id }}">{{ option.name }}</option>`,
      `</select>`,
    ].join('\n'),
  };
}

function wdLayoutSelectCtrl($route, $routeParams, wdLayouts) {
  this.layouts = [];
  wdLayouts.list().then(layouts => {
    this.layouts = layouts;
  });

  this.layoutId = function(newValue) {
    if (arguments.length > 0) {
      $route.updateParams({layoutId: newValue});
    } else {
      return $routeParams.layoutId;
    }
  };
}
wdLayoutSelectCtrl.$inject = ['$route', '$routeParams', 'wdLayouts'];

angular.module('web-dashboard')
  .controller('wdLayoutSelectCtrl', wdLayoutSelectCtrl)
  .directive('wdLayoutSelect', wdLayoutSelectDrct);
