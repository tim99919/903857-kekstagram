'use strict';

(function () {

  var uploadedPhoto = document.querySelector('.img-upload__preview').firstElementChild;

  var effectToFilter = {
    chrome: function (value) {
      return 'grayscale(' + value / 100 + ')';
    },
    sepia: function (value) {
      return 'sepia(' + value / 100 + ')';
    },
    marvin: function (value) {
      return 'invert(' + value + '%)';
    },
    phobos: function (value) {
      return 'blur(' + (value / 100 * 2 + 1) + 'px)';
    },
    heat: function (value) {
      return 'brightness(' + value / 100 * 3 + ')';
    }
  };

  window.effect = {

    clearPhotoStyle: function () {
      uploadedPhoto.removeAttribute('class');
      uploadedPhoto.removeAttribute('style');
    },

    setPhotoStyle: function (value) {
      var appliedEffect = uploadedPhoto.className.substr(18);

      uploadedPhoto.style.filter = effectToFilter[appliedEffect](value);
      uploadedPhoto.style.webkitFilter = uploadedPhoto.style.filter;
    },

  };

})();
