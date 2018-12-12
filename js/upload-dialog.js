'use strict';

(function () {
  var imgUploadDialog = document.querySelector('.img-upload__overlay');
  var imgUploadFile = document.querySelector('#upload-file');

  var uploadedImgPreview = imgUploadDialog.querySelector('.img-upload__preview').firstElementChild;
  var imgUploadCancelButton = imgUploadDialog.querySelector('.cancel');
  var imgUploadHashtagsInput = imgUploadDialog.querySelector('.text__hashtags');
  var imgUploadDescriptionInput = imgUploadDialog.querySelector('.text__description');

  var effectLevel = imgUploadDialog.querySelector('.effect-level');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

  var effectPreviews = imgUploadDialog.querySelectorAll('.effects__radio');


  var onLevelPinDrag = function (evt) {
    window.slider.initSlider(evt, effectLevelPin, effectLevelLine, effectLevelDepth, window.effect.setPhotoStyle, window.form.setEffectInputValue);
  };

  var onImgUploadDialogEscPress = function (evt) {
    window.util.isEscEvent(evt, closeImgUploadDialog);
  };

  var showEffectLevel = function () {
    var DEFAULT_VALUE = 100;
    effectLevel.classList.remove('hidden');
    window.effect.setPhotoStyle(DEFAULT_VALUE);
    window.form.setEffectInputValue(DEFAULT_VALUE);
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
    } else {
      showEffectLevel();
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

  var openImgUploadDialog = function () {
    imgUploadDialog.classList.remove('hidden');
    effectLevel.classList.add('hidden');

    document.addEventListener('keydown', onImgUploadDialogEscPress);
    imgUploadCancelButton.addEventListener('click', closeImgUploadDialog);
    imgUploadHashtagsInput.addEventListener('focus', onHashtagsInputFocus);
    imgUploadHashtagsInput.addEventListener('blur', onHashtagsInputBlur);
    imgUploadDescriptionInput.addEventListener('focus', onDescriptionInputFocus);
    imgUploadDescriptionInput.addEventListener('blur', onDescriptionInputBlur);
    window.util.addListeners(effectPreviews, 'change', onEffectClick);
  };

  var closeImgUploadDialog = function () {
    imgUploadDialog.classList.add('hidden');

    document.removeEventListener('keydown', onImgUploadDialogEscPress);
    imgUploadCancelButton.removeEventListener('click', closeImgUploadDialog);
    imgUploadHashtagsInput.removeEventListener('focus', onHashtagsInputFocus);
    imgUploadHashtagsInput.removeEventListener('blur', onHashtagsInputBlur);
    imgUploadDescriptionInput.removeEventListener('focus', onDescriptionInputFocus);
    imgUploadDescriptionInput.removeEventListener('blur', onDescriptionInputBlur);
    window.util.removeListeners(effectPreviews, 'change', onEffectClick);
    window.form.clearForm();
    window.effect.clearPhotoStyle();
  };

  imgUploadFile.addEventListener('change', function () {
    openImgUploadDialog();
  });
})();
