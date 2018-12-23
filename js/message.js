'use strict';

(function () {

  var mainSection = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

  var getMessagePopupElem = function () {
    return mainSection.lastElementChild;
  };

  var hideMessage = function () {
    mainSection.removeChild(getMessagePopupElem());
  };

  var showMessage = function (template, callback, download, errorMessage) {
    var fragment = document.createDocumentFragment();
    var message = template.cloneNode(true);
    fragment.appendChild(message);

    if (download) {
      var buttonsElem = message.querySelector('.error__buttons');
      buttonsElem.removeChild(buttonsElem.lastElementChild);
      buttonsElem.firstElementChild.style.margin = '0';
      message.querySelector('h2').textContent = errorMessage;
    }

    mainSection.appendChild(fragment);

    if (!download) {
      callback();
    }
  };

  var getMainElementsToListen = function (popup) {
    return [
      {
        elem: mainSection,
        event: 'click',
        callback: popup.onOtsideClick
      },
      {
        elem: document,
        event: 'keydown',
        callback: popup.onEscPress
      },
    ];
  };

  var uploadErrorPopup = {

    getRepeatButtonElem: function () {
      var repeatButton = getMessagePopupElem().querySelector('.error__buttons').firstElementChild;
      return repeatButton;
    },

    getAnotherFileButtonElem: function () {
      var anotherFileButton = getMessagePopupElem().querySelector('.error__buttons').lastElementChild;
      return anotherFileButton;
    },

    getElementsToListen: function () {
      return [
        {
          elem: uploadErrorPopup.getRepeatButtonElem(),
          event: 'click',
          callback: uploadErrorPopup.onRepeatButtonClick
        },
        {
          elem: uploadErrorPopup.getAnotherFileButtonElem(),
          event: 'click',
          callback: uploadErrorPopup.onAnotherFileButtonClick
        }
      ];
    },

    onRepeatButtonClick: function () {
      window.util.removeListeners(uploadErrorPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(uploadErrorPopup));
      hideMessage();
      window.uploadDialog.show();
    },

    onAnotherFileButtonClick: function () {
      window.util.removeListeners(uploadErrorPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(uploadErrorPopup));
      hideMessage();
      window.uploadDialog.close();
    },

    onEscPress: function (evt) {
      window.util.removeListeners(uploadErrorPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(uploadErrorPopup));
      window.util.isEscEvent(evt, hideMessage);
      window.uploadDialog.close();
    },

    onOtsideClick: function (evt) {
      if (evt.target === mainSection.lastElementChild) {
        window.util.removeListeners(uploadErrorPopup.getElementsToListen());
        window.util.removeListeners(getMainElementsToListen(uploadErrorPopup));
        hideMessage();
        window.uploadDialog.close();
      }
    },

  };

  var uploadSuccessPopup = {

    getButtonElem: function () {
      var button = getMessagePopupElem().querySelector('.success__button');
      return button;
    },

    getElementsToListen: function () {
      return [
        {
          elem: uploadSuccessPopup.getButtonElem(),
          event: 'click',
          callback: uploadSuccessPopup.onButtonClick
        }
      ];
    },

    onEscPress: function (evt) {
      window.util.removeListeners(uploadSuccessPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(uploadSuccessPopup));
      window.util.isEscEvent(evt, hideMessage);

    },

    onOtsideClick: function (evt) {
      if (evt.target === mainSection.lastElementChild) {
        window.util.removeListeners(uploadSuccessPopup.getElementsToListen());
        window.util.removeListeners(getMainElementsToListen(uploadSuccessPopup));
        hideMessage();
      }
    },

    onButtonClick: function () {
      window.util.removeListeners(uploadSuccessPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(uploadSuccessPopup));
      hideMessage();
    },

  };

  var downloadErrorPopup = {

    getButtonElem: function () {
      var repeatButton = getMessagePopupElem().querySelector('.error__buttons').firstElementChild;
      return repeatButton;
    },

    getElementsToListen: function () {
      return [
        {
          elem: downloadErrorPopup.getButtonElem(),
          event: 'click',
          callback: downloadErrorPopup.onButtonClick
        }
      ];
    },

    onButtonClick: function () {
      window.util.removeListeners(downloadErrorPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(downloadErrorPopup));
      hideMessage();
      window.photoPreviews.downloadData();
    },

    onEscPress: function (evt) {
      window.util.removeListeners(uploadErrorPopup.getElementsToListen());
      window.util.removeListeners(getMainElementsToListen(uploadErrorPopup));
      window.util.isEscEvent(evt, hideMessage);
    },

    onOtsideClick: function (evt) {
      if (evt.target === mainSection.lastElementChild) {
        window.util.removeListeners(uploadErrorPopup.getElementsToListen());
        window.util.removeListeners(getMainElementsToListen(uploadErrorPopup));
        hideMessage();
      }
    },

  };

  window.message = {

    uploadError: function () {
      showMessage(errorMessageTemplate, window.uploadDialog.hide);
      window.util.addListeners(uploadErrorPopup.getElementsToListen());
      window.util.addListeners(getMainElementsToListen(uploadErrorPopup));
    },

    uploadSuccess: function () {
      showMessage(successMessageTemplate, window.uploadDialog.close);
      window.util.addListeners(uploadSuccessPopup.getElementsToListen());
      window.util.addListeners(getMainElementsToListen(uploadSuccessPopup));
    },

    downloadError: function (errorMessage) {
      showMessage(errorMessageTemplate, undefined, true, errorMessage);
      window.util.addListeners(downloadErrorPopup.getElementsToListen());
      window.util.addListeners(getMainElementsToListen(downloadErrorPopup));
    }

  };

})();
