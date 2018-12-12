'use strict';

(function () {

  var uploadedPhoto = document.querySelector('.img-upload__preview').firstElementChild;

  window.effect = {

    uploadedPhoto: uploadedPhoto,

    clearPhotoStyle: function () {
      uploadedPhoto.removeAttribute('class');
      uploadedPhoto.removeAttribute('style');
    },

    setPhotoStyle: function (value) {
      var effect = uploadedPhoto.className.substr(18);

      switch (effect) {
        case 'chrome':
          uploadedPhoto.style.filter = 'grayscale(' + value / 100 + ')';
          break;

        case 'sepia':
          uploadedPhoto.style.filter = 'sepia(' + value / 100 + ')';
          break;

        case 'marvin':
          uploadedPhoto.style.filter = 'invert(' + value + '%)';
          break;

        case 'phobos':
          uploadedPhoto.style.filter = 'blur(' + (value / 100 * 2 + 1) + 'px)';
          break;

        case 'heat':
          uploadedPhoto.style.filter = 'brightness(' + value / 100 * 3 + ')';
          break;

        default:
          uploadedPhoto.style.filter = '';
          break;
      }

      uploadedPhoto.style.webkitFilter = uploadedPhoto.style.filter;
    },

  };

})();
