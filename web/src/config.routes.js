function layoutRouteCtrl($routeParams) {
  this.layoutId = $routeParams.layoutId;
}
layoutRouteCtrl.$inject = ['$routeParams'];

function routes($routeProvider) {
  $routeProvider
  .when('/layout/:layoutId', {
    template: '<wd-container layout-id="ctrl.layoutId"></wd-container>',
    controller: 'wdLayoutRouteCtrl',
    controllerAs: 'ctrl',
  })
  .otherwise('/layout/l0');
}
routes.$inject = ['$routeProvider'];

angular.module('web-dashboard')
  .controller('wdLayoutRouteCtrl', layoutRouteCtrl)
  .config(routes);
