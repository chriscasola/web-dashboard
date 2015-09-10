function wdNotifierFact($timeout) {
  const body = angular.element('body');
  const notificationContainer = angular.element('<div class="wd-notifications"></div>');
  body.append(notificationContainer);

  return {
    notify: function(config) {
      const notification = angular.element([
        `<div class="wd-notification-moving">`,
          `<div class="wd-notification-header">${config.header}</div>`,
          `<div class="wd-notification-body">${config.body}</div>`,
        `</div>`,
      ].join('\n'));
      notificationContainer.append(notification);

      $timeout(function() {
        notification.removeClass('wd-notification-moving');
      }, 250, false);

      $timeout(function() {
        notification.addClass('wd-notification-moving');
        $timeout(function() {
          notification.remove();
        }, 250, false);
      }, 2000, false);
    },
  };
}

wdNotifierFact.$inject = ['$timeout'];

angular.module('web-dashboard').factory('wdNotifier', wdNotifierFact);
