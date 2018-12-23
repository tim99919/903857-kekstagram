'use strict';

(function () {

  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 2;

  var imgUploadForm = document.querySelector('.img-upload__form');
  var scaleValue = imgUploadForm.querySelector('.scale__control--value');
  var effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
  var uploadFormInputs = imgUploadForm.querySelectorAll('input');
  var commentTextarea = imgUploadForm.querySelector('.text__description');
  var effectNone = imgUploadForm.querySelector('#effect-none');

  window.form = {

    imgUpload: imgUploadForm,

    clearForm: function () {
      uploadFormInputs.forEach(function (it) {
        it.value = '';
      });

      commentTextarea.value = '';
      scaleValue.value = '100%';
      effectNone.checked = true;
    },

    setEffectInputValue: function (newValue) {
      effectLevelValue.value = newValue;
    },

    hashtagsInputCustomValidation: function (evt) {
      var target = evt.target;
      var hashtagsStr = target.value;
      var hashtags = target.value.split(' ');
      var rules = [];
      var hashtag;
      var isSharp = true;
      var wrongLength = false;
      var isUnique = true;

      for (var i = 0; i < hashtags.length; i++) {
        hashtag = hashtags[i];
        if (!/#/.test(hashtag[0])) {
          isSharp = false;
          break;
        }
        if (hashtag.length < MIN_HASHTAG_LENGTH || hashtag.length > MAX_HASHTAG_LENGTH) {
          wrongLength = true;
          break;
        }
        if (hashtags.length > 1) {
          for (var j = i + 1; j < hashtags.length; j++) {
            var anotherHashtag = hashtags[j];
            if (hashtag.toLowerCase() === anotherHashtag.toLowerCase()) {
              isUnique = false;
              break;
            }
          }
        }
      }

      if (!isSharp) {
        rules.push('Название хэштэга должно начинаться с символа #');
      }
      if (wrongLength) {
        rules.push('Недопустимая длина хэштэга');
      }
      if (hashtags.length > MAX_HASHTAGS_COUNT) {
        rules.push('Возможно указать не более 5-ти хэштэгов');
      }
      if (!isUnique) {
        rules.push('Хэштеги не должны повторяться');
      }
      if (/\S#/.test(hashtagsStr)) {
        rules.push('Хэштеги разделяются пробелами');
      }
      target.setCustomValidity(rules.join(', '));
      if (rules.length > 0) {
        target.style.borderColor = 'red';
      } else {
        target.removeAttribute('style');
      }
      if (target.value === '') {
        target.setCustomValidity('');
      }
    },
  };

})();

