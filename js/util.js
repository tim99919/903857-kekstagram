'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {

    isEscEvent: function (evt, callback) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        callback();
      }
    },

    getRandInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandElement: function (arr) {
      return arr[window.util.getRandInt(0, arr.length - 1)];
    },

    addListeners: function (arr, event, callback) {
      for (var i = 0; i < arr.length; i++) {
        if (event) {
          arr[i].addEventListener(event, callback);
          continue;
        }
        arr[i].elem.addEventListener(arr[i].event, arr[i].callback);
      }
    },

    removeListeners: function (arr, event, callback) {
      for (var i = 0; i < arr.length; i++) {
        if (event) {
          arr[i].removeEventListener(event, callback);
          continue;
        }
        arr[i].elem.removeEventListener(arr[i].event, arr[i].callback);
      }
    },

  };
})();
