'use strict';

(function () {

  var DEFAULT_EFFECT_VALUE = 100;

  var PhotoScale = {
    min: 25,
    max: 100,
    step: 25
  };

  var imgUploadDialog = document.querySelector('.img-upload__overlay');
  var imgUploadFile = document.querySelector('#upload-file');

  var uploadedImgPreview = imgUploadDialog.querySelector('.img-upload__preview').firstElementChild;
  var imgUploadCancelButton = imgUploadDialog.querySelector('.cancel');
  var smallerScaleButton = imgUploadDialog.querySelector('.scale__control--smaller');
  var biggerScaleButton = imgUploadDialog.querySelector('.scale__control--bigger');
  var imgUploadHashtagsInput = imgUploadDialog.querySelector('.text__hashtags');
  var imgUploadDescriptionInput = imgUploadDialog.querySelector('.text__description');

  var effectLevel = imgUploadDialog.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

  var effectPreviews = imgUploadDialog.querySelectorAll('.effects__radio');

  var transformImgScale = function (value) {
    uploadedImgPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var getCurrentScaleValue = function (input) {
    return parseInt(input.substr(0, input.length - 1), 10);
  };

  var onLevelPinDrag = function (evt) {
    window.slider.initSlider(evt, effectLevelPin, effectLevelLine, effectLevelDepth, window.effect.setPhotoStyle, window.form.setEffectInputValue);
  };

  var onImgUploadDialogEscPress = function (evt) {
    window.util.isEscEvent(evt, window.uploadDialog.close);
  };

  var showEffectLevel = function () {
    effectLevel.classList.remove('hidden');
    window.effect.setPhotoStyle(DEFAULT_EFFECT_VALUE);
    window.form.setEffectInputValue(DEFAULT_EFFECT_VALUE);
    window.slider.setDefault(effectLevelPin, effectLevelDepth);
    effectLevelPin.addEventListener('mousedown', onLevelPinDrag);
  };

  var hideEffectLevel = function () {
    effectLevel.classList.add('hidden');
    effectLevelPin.removeEventListener('mousedown', onLevelPinDrag);
  };

  var onEffectClick = function (evt) {
    var effect = evt.target.id.substr(7);
    uploadedImgPreview.className = 'effects__preview--' + effect;
    if (effect === 'none') {
      hideEffectLevel();
      window.effect.clearPhotoStyle();
    } else {
      showEffectLevel();
    }
  };

  var onSmallerScaleButtonClick = function (evt) {
    var target = evt.target;
    var currentScaleValue = getCurrentScaleValue(target.nextElementSibling.value) - PhotoScale.step;

    if (currentScaleValue >= PhotoScale.min) {
      target.nextElementSibling.value = currentScaleValue + '%';
      transformImgScale(currentScaleValue);
    }
  };

  var onBiggerScaleButtonClick = function (evt) {
    var target = evt.target;
    var currentScaleValue = getCurrentScaleValue(target.previousElementSibling.value) + PhotoScale.step;

    if (currentScaleValue <= PhotoScale.max) {
      target.previousElementSibling.value = currentScaleValue + '%';
      transformImgScale(currentScaleValue);
    }
  };

  var onHashtagsInputFocus = function () {
    document.removeEventListener('keydown', onImgUploadDialogEscPress);
    imgUploadHashtagsInput.addEventListener('input', window.form.hashtagsInputCustomValidation);
  };

  var onHashtagsInputBlur = function () {
    document.addEventListener('keydown', onImgUploadDialogEscPress);
    imgUploadHashtagsInput.removeEventListener('input', window.form.hashtagsInputCustomValidation);
  };

  var onDescriptionInputFocus = function () {
    document.removeEventListener('keydown', onImgUploadDialogEscPress);
  };

  var onDescriptionInputBlur = function () {
    document.addEventListener('keydown', onImgUploadDialogEscPress);
  };

  // var errorPopup = {

  //   onRepeatButtonClick: function () {
  //     submitMessage.Error.hideMessage();
  //     imgUploadDialog.classList.remove('hidden');
  //   },

  //   onAnotherFileButtonClick: function () {
  //     submitMessage.Error.hideMessage();
  //     closeImgUploadDialog();
  //   },

  //   onOutsideClick: function (evt) {
  //     if (evt.target === mainSection.lastElementChild) {
  //       submitMessage.Error.hideMessage();
  //     }
  //   },

  //   onEscPress: function (evt) {
  //     window.util.isEscEvent(evt, submitMessage.Error.hideMessage);
  //   },

  //   hideMessage: function () {
  //     var repeatButton = mainSection.lastElementChild.querySelector('.error__buttons').firstElementChild;
  //     var anotherFileButton = mainSection.lastElementChild.querySelector('.error__buttons').lastElementChild;
  //     var removeElement = mainSection.lastElementChild;
  //     repeatButton.removeEventListener('click', submitMessage.Error.onButtonClick);
  //     anotherFileButton.removeEventListener('click', submitMessage.Error.onButtonClick);
  //     mainSection.removeEventListener('click', submitMessage.Error.onOutsideClick);
  //     document.removeEventListener('keydown', submitMessage.Error.onEscPress);
  //     mainSection.removeChild(removeElement);
  //   },

  //   showMessage: function () {
  //     var fragment = document.createDocumentFragment();
  //     var errorMessage = errorMessageTemplate.cloneNode(true);
  //     imgUploadDialog.classList.add('hidden');
  //     fragment.appendChild(errorMessage);
  //     mainSection.appendChild(fragment);
  //     mainSection.lastElementChild.querySelector('.error__buttons').firstElementChild.addEventListener('click', submitMessage.Error.onRepeatButtonClick);
  //     mainSection.lastElementChild.querySelector('.error__buttons').lastElementChild.addEventListener('click', submitMessage.Error.onAnotherFileButtonClick);
  //     mainSection.addEventListener('click', submitMessage.Error.onOutsideClick);
  //     document.addEventListener('keydown', submitMessage.Error.onEscPress);
  //   },

  // },

  //   Success: {

  //     onButtonClick: function () {
  //       submitMessage.Success.hideMessage();
  //     },

  //     onOutsideClick: function (evt) {
  //       if (evt.target === mainSection.lastElementChild) {
  //         submitMessage.Success.hideMessage();
  //       }
  //     },

  //     onEscPress: function (evt) {
  //       window.util.isEscEvent(evt, submitMessage.Success.hideMessage);
  //     },

  //     hideMessage: function () {
  //       var successButton = mainSection.lastElementChild.querySelector('.success__button');
  //       var removeElement = mainSection.lastElementChild;
  //       successButton.removeEventListener('click', submitMessage.Success.onButtonClick);
  //       mainSection.removeEventListener('click', submitMessage.Success.onOutsideClick);
  //       document.removeEventListener('keydown', submitMessage.Success.onEscPress);
  //       mainSection.removeChild(removeElement);
  //     },

  //     showMessage: function () {
  //       closeImgUploadDialog();
  //       var fragment = document.createDocumentFragment();
  //       var successMessage = successMessageTemplate.cloneNode(true);
  //       fragment.appendChild(successMessage);
  //       mainSection.appendChild(fragment);
  //       mainSection.lastElementChild.querySelector('.success__button').addEventListener('click', submitMessage.Success.onButtonClick);
  //       mainSection.addEventListener('click', submitMessage.Success.onOutsideClick);
  //       document.addEventListener('keydown', submitMessage.Success.onEscPress);
  //     },

  //   },

  // };

  var onFormSubmit = function (evt) {
    window.backend.upload(new FormData(window.form.imgUpload), window.message.uploadSuccess, window.message.uploadError);
    evt.preventDefault();
  };

  var openImgUploadDialog = function () {
    imgUploadDialog.classList.remove('hidden');
    effectLevel.classList.add('hidden');

    window.util.addListeners(elementsToListen);
    window.util.addListeners(effectPreviews, 'change', onEffectClick);
  };

  window.uploadDialog = {
    hide: function () {
      imgUploadDialog.classList.add('hidden');
    },
    show: function () {
      imgUploadDialog.classList.remove('hidden');
    },
    close: function () {
      imgUploadDialog.classList.add('hidden');

      window.util.removeListeners(elementsToListen);
      window.util.removeListeners(effectPreviews, 'change', onEffectClick);

      window.form.clearForm();
      window.effect.clearPhotoStyle();
    },
  };

  var elementsToListen = [
    {
      elem: document,
      event: 'keydown',
      callback: onImgUploadDialogEscPress
    },
    {
      elem: imgUploadCancelButton,
      event: 'click',
      callback: window.uploadDialog.close
    },
    {
      elem: imgUploadHashtagsInput,
      event: 'focus',
      callback: onHashtagsInputFocus
    },
    {
      elem: imgUploadHashtagsInput,
      event: 'blur',
      callback: onHashtagsInputBlur
    },
    {
      elem: imgUploadDescriptionInput,
      event: 'focus',
      callback: onDescriptionInputFocus
    },
    {
      elem: imgUploadDescriptionInput,
      event: 'blur',
      callback: onDescriptionInputBlur
    },
    {
      elem: smallerScaleButton,
      event: 'click',
      callback: onSmallerScaleButtonClick
    },
    {
      elem: biggerScaleButton,
      event: 'click',
      callback: onBiggerScaleButtonClick
    },
    {
      elem: window.form.imgUpload,
      event: 'submit',
      callback: onFormSubmit
    }
  ];

  imgUploadFile.addEventListener('change', function () {
    openImgUploadDialog();
  });


})();
