'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form');
  var scaleValue = imgUploadForm.querySelector('.scale__control--value');
  var effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
  var uploadFormInputs = imgUploadForm.querySelectorAll('input');
  var commentTextarea = imgUploadForm.querySelector('.text__description');

  window.form = {

    imgUpload: imgUploadForm,

    clearForm: function () {
      for (var i = 0; i < uploadFormInputs.length; i++) {
        if (uploadFormInputs[i].type === 'radio') {
          if (uploadFormInputs[i].value === 'none') {
            uploadFormInputs[i].checked = true;
          }
          continue;
        }
        uploadFormInputs[i].value = '';
      }

      commentTextarea.value = '';
      scaleValue.value = '100%';
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
      var isReapeat = false;

      for (var i = 0; i < hashtags.length; i++) {
        hashtag = hashtags[i];
        if (!/#/.test(hashtag[0])) {
          isSharp = false;
          break;
        }
        if (hashtag.length < 2 || hashtag.length > 20) {
          wrongLength = true;
          break;
        }
        if (hashtags.length > 1) {
          for (var j = i + 1; j < hashtags.length; j++) {
            var anotherHashtag = hashtags[j];
            if (hashtag.toLowerCase() === anotherHashtag.toLowerCase()) {
              isReapeat = true;
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
      if (hashtags.length > 5) {
        rules.push('Возможно указать не более 5-ти хэштэгов');
      }
      if (isReapeat) {
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

