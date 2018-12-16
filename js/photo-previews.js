'use strict';

(function () {
  var mainSection = document.querySelector('main');
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var pictures = [];

  var onDownloadError = {

    onRepeatButtonClick: function () {
      onDownloadError.hideMessage();
      downloadData();
    },

    onOutsideClick: function (evt) {
      if (evt.target === mainSection.lastElementChild) {
        onDownloadError.hideMessage();
      }
    },

    onEscPress: function (evt) {
      window.util.isEscEvent(evt, onDownloadError.hideMessage);
    },

    hideMessage: function () {
      var repeatButton = mainSection.lastElementChild.querySelector('.error__button');
      var removeElement = mainSection.lastElementChild;
      repeatButton.removeEventListener('click', onDownloadError.onButtonClick);
      mainSection.removeEventListener('click', onDownloadError.onOutsideClick);
      document.removeEventListener('keydown', onDownloadError.onEscPress);
      mainSection.removeChild(removeElement);
    },

    showMessage: function (errorMessage) {
      var fragment = document.createDocumentFragment();
      var errorPopup = errorMessageTemplate.cloneNode(true);
      var buttonsElem = errorPopup.querySelector('.error__buttons');
      buttonsElem.removeChild(buttonsElem.lastElementChild);
      buttonsElem.firstElementChild.style.margin = '0';
      errorPopup.querySelector('h2').textContent = errorMessage;
      fragment.appendChild(errorPopup);
      mainSection.appendChild(fragment);
      mainSection.lastElementChild.querySelector('.error__button').addEventListener('click', onDownloadError.onRepeatButtonClick);
      mainSection.addEventListener('click', onDownloadError.onOutsideClick);
      document.addEventListener('keydown', onDownloadError.onEscPress);
    },

  };

  var getData = function (data) {
    window.photoCards = data;
    showPhotoCards();
  };

  var downloadData = function () {
    window.backend.download(getData, onDownloadError.showMessage);
  };

  var renderPhotoCard = function (i) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.id = i;
    pictureElement.querySelector('img').src = window.photoCards[i].url;
    pictureElement.querySelector('.picture__likes').textContent = window.photoCards[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = window.photoCards[i].comments.length;

    return pictureElement;
  };

  var showPhotoCards = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.photoCards.length; i++) {
      fragment.appendChild(renderPhotoCard(i));
    }

    picturesContainer.appendChild(fragment);
    pictures = picturesContainer.querySelectorAll('.picture');

    window.util.addListeners(pictures, 'click', window.onPictureClick);
  };

  downloadData();

})();
