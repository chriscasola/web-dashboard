function config($httpProvider) {
  $httpProvider
  .useApplyAsync(true)
  .useLegacyPromiseExtensions(true);
}
config.$inject = ['$httpProvider'];

angular.module('web-dashboard').config(config);
