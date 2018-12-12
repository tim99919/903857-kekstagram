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

    addListeners: function (elements, event, callback) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event, callback);
      }
    },

    removeListeners: function (elements, event, callback) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeEventListener(event, callback);
      }
    }

  };
})();
