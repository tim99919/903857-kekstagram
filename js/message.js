'use strict';

(function () {

  var mainSection = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

  var getMessagePopupElem = function () {
    return mainSection.lastElementChild;
  };

  var onMessagePopupOutsideClick = function (evt) {
    if (evt.target === mainSection.lastElementChild) {
      hideMessage();
    }
  };

  var onMessagePopupEscPress = function (evt) {
    window.util.isEscEvent(evt, hideMessage);
  };

  var uploadErrorPopup = {

    onRepeatButtonClick: function () {
      hideMessage(uploadErrorPopup.removeListeners);
      window.uploadDialog.show();
    },

    onAnotherFileButtonClick: function () {
      hideMessage(uploadErrorPopup.removeListeners);
      window.uploadDialog.close();
    },

    addListeners: function () {
      var repeatButton = getMessagePopupElem().querySelector('.error__buttons').firstElementChild;
      var anotherFileButton = getMessagePopupElem().querySelector('.error__buttons').lastElementChild;
      repeatButton.addEventListener('click', uploadErrorPopup.onRepeatButtonClick);
      anotherFileButton.addEventListener('click', uploadErrorPopup.onAnotherFileButtonClick);
      mainSection.addEventListener('click', onMessagePopupOutsideClick);
      document.addEventListener('keydown', onMessagePopupEscPress);
    },

    removeListeners: function () {
      var repeatButton = getMessagePopupElem().querySelector('.error__buttons').firstElementChild;
      var anotherFileButton = getMessagePopupElem().querySelector('.error__buttons').lastElementChild;
      repeatButton.removeEventListener('click', uploadErrorPopup.onRepeatButtonClick);
      anotherFileButton.removeEventListener('click', uploadErrorPopup.onAnotherFileButtonClick);
      mainSection.removeEventListener('click', onMessagePopupOutsideClick);
      document.removeEventListener('keydown', onMessagePopupEscPress);
    }

  };

  var uploadSuccessPopup = {

    onButtonClick: function () {
      hideMessage(uploadSuccessPopup.removeListeners);
    },

    addListeners: function () {
      var button = getMessagePopupElem().querySelector('.success__button');
      button.addEventListener('click', uploadSuccessPopup.onButtonClick);
      mainSection.addEventListener('click', onMessagePopupOutsideClick);
      document.addEventListener('keydown', onMessagePopupEscPress);
    },

    removeListeners: function () {
      var button = getMessagePopupElem().querySelector('.success__button');
      button.removeEventListener('click', uploadSuccessPopup.onButtonClick);
      mainSection.removeEventListener('click', onMessagePopupOutsideClick);
      document.removeEventListener('keydown', onMessagePopupEscPress);
    },

  };

  var hideMessage = function (removeListeners) {
    removeListeners();
    mainSection.removeChild(getMessagePopupElem());
  };

  var showMessage = function (template, addListeners, callback) {
    var fragment = document.createDocumentFragment();
    var message = template.cloneNode(true);
    fragment.appendChild(message);
    mainSection.appendChild(fragment);
    addListeners();
    callback();
  };

  window.message = {

    uploadError: function () {
      showMessage(errorMessageTemplate, uploadErrorPopup.addListeners, window.uploadDialog.hide);
    },

    uploadSuccess: function () {
      showMessage(successMessageTemplate, uploadSuccessPopup.addListeners, window.uploadDialog.close);
    },

    downloadError: ''

  };

})();
