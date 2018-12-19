'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureFiltersElem = document.querySelector('.img-filters');

  var pictures = [];
  var photoCards;

  var renderPhotoCard = function (photos, i, IDs) {
    var pictureElement = pictureTemplate.cloneNode(true);
    if (IDs) {
      pictureElement.id = IDs[i];
    } else {
      pictureElement.id = i;
    }
    pictureElement.querySelector('img').src = photos[i].url;
    pictureElement.querySelector('.picture__likes').textContent = photos[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = photos[i].comments.length;

    return pictureElement;
  };

  var showPictureFilters = function () {
    pictureFiltersElem.classList.remove('img-filters--inactive');
  };

  var onSuccessDownload = function (data) {
    photoCards = data;
    window.photoPreviews.showPhotoCards(data);
    showPictureFilters();
  };

  window.photoPreviews = {

    getPhotoCards: function () {
      return photoCards;
    },

    showPhotoCards: function (photos, IDs) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(renderPhotoCard(photos, i, IDs));
      }

      picturesContainer.appendChild(fragment);
      pictures = picturesContainer.querySelectorAll('.picture');

      window.util.addListeners(pictures, 'click', window.onPictureClick);
    },

    downloadData: function () {
      window.backend.download(onSuccessDownload, window.message.downloadError);
    },

  };

  window.photoPreviews.downloadData();

})();
