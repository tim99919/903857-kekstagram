'use strict';

(function () {

  window.debounce = function (cb, interval) {
    var lastTimeout = null;

    return function () {
      var params = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, params);
      }, interval);
    };
  };

})();
