'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var pictures = [];

  var getData = function (data) {
    window.photoCards = data;
    showPhotoCards();
  };

  window.backend.download(getData);

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

})();
