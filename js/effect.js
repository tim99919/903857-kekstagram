'use strict';

(function () {

  var EFFECT_NAME_START_INDEX = 18;

  var uploadedPhoto = document.querySelector('.img-upload__preview').firstElementChild;


  var getEffectName = function () {
    return uploadedPhoto.className.substr(EFFECT_NAME_START_INDEX);
  };

  var effectToFilter = {
    chrome: function (value) {
      return 'grayscale(' + window.util.transferPercentToRange(value, 0, 1) + ')';
    },
    sepia: function (value) {
      return 'sepia(' + window.util.transferPercentToRange(value, 0, 1) + ')';
    },
    marvin: function (value) {
      return 'invert(' + value + '%)';
    },
    phobos: function (value) {
      return 'blur(' + window.util.transferPercentToRange(value, 1, 3) + 'px)';
    },
    heat: function (value) {
      return 'brightness(' + window.util.transferPercentToRange(value, 0, 3) + ')';
    }
  };

  window.effect = {

    clearPhotoStyle: function () {
      uploadedPhoto.removeAttribute('class');
      uploadedPhoto.removeAttribute('style');
    },

    setPhotoStyle: function (value) {
      var appliedEffect = getEffectName();

      uploadedPhoto.style.filter = effectToFilter[appliedEffect](value);
      uploadedPhoto.style.webkitFilter = uploadedPhoto.style.filter;
    },

  };

})();
