'use strict';

(function () {

  window.slider = {
    initSlider: function (evt, pin, line, depth, action, callback) {
      evt.preventDefault();

      var startCoordinate = evt.clientX;
      var lineWidth = line.offsetWidth;

      var getValue = function () {
        return Math.round(pin.offsetLeft / lineWidth * 100); // from 0 to 100
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoordinate - moveEvt.clientX;
        var value = getValue();
        startCoordinate = moveEvt.clientX;

        if (shift > pin.offsetLeft) {
          pin.style.left = '0px';
        } else if (shift < pin.offsetLeft - lineWidth) {
          pin.style.left = lineWidth + 'px';
        } else {
          pin.style.left = (pin.offsetLeft - shift) + 'px';
        }

        depth.style.width = pin.offsetLeft + 'px';

        action(value);
        callback(value);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        var value = getValue();
        action(value);
        callback(value);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    setDefault: function (pin, depth) {
      pin.style.left = 100 + '%';
      depth.style.width = 100 + '%';
    }

  };
})();
