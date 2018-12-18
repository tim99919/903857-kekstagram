'use strict';

(function () {

  var NEW_PHOTO_COUNT = 10;

  var imgFiltersElem = document.querySelector('.img-filters');
  var popularButton = imgFiltersElem.querySelector('#filter-popular');
  var newButton = imgFiltersElem.querySelector('#filter-new');
  var discussedButton = imgFiltersElem.querySelector('#filter-discussed');

  var buttons = imgFiltersElem.querySelectorAll('.img-filters__button');

  var picturesContainer = document.querySelector('.pictures');

  var resetActiveButton = function () {
    buttons.forEach(function (button) {
      button.className = 'img-filters__button';
    });
  };

  var setActiveButton = function (evt) {
    var target = evt.target;
    target.classList.add('img-filters__button--active');
  };

  var clearPicturesContainer = function () {
    var pictures = picturesContainer.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      picturesContainer.removeChild(picture);
    });
  };

  var getNewPhotos = function (photoCards) {

    var compareRandom = function () {
      return Math.random() - 0.5;
    };

    var newPhotos = photoCards.
      map(function (photoCard, index) {
        return {
          item: photoCard,
          index: index
        };
      }).
      sort(compareRandom).
      slice(0, NEW_PHOTO_COUNT);

    return {
      photos: newPhotos.map(function (photo) {
        return photo.item;
      }),
      IDs: newPhotos.map(function (photo) {
        return photo.index;
      })
    };

  };

  var getDiscussedPhotos = function (photoCards) {

    var commentsCountComparator = function (picA, picB) {
      return picB.item.comments.length - picA.item.comments.length;
    };

    var discussedPhotos = photoCards.
      map(function (photoCard, index) {
        return {
          item: photoCard,
          index: index
        };
      }).
      sort(commentsCountComparator);

    return {
      photos: discussedPhotos.map(function (photo) {
        return photo.item;
      }),
      IDs: discussedPhotos.map(function (photo) {
        return photo.index;
      })
    };

  };

  var showPopularPhotos = function () {
    window.photoPreviews.showPhotoCards(window.photoPreviews.getPhotoCards());
  };

  var showNewPhotos = function () {
    var photoCards = window.photoPreviews.getPhotoCards();
    var newPhotoCards = getNewPhotos(photoCards);
    window.photoPreviews.showPhotoCards(newPhotoCards.photos, newPhotoCards.IDs);
  };

  var showDiscussedPhotos = function () {
    var photoCards = window.photoPreviews.getPhotoCards();
    var discussedPhotos = getDiscussedPhotos(photoCards);
    window.photoPreviews.showPhotoCards(discussedPhotos.photos, discussedPhotos.IDs);
  };

  var onPopularButtonClick = function (evt) {
    resetActiveButton();
    setActiveButton(evt);
    clearPicturesContainer();
    showPopularPhotos();
  };

  var onNewButtonClick = function (evt) {
    resetActiveButton();
    setActiveButton(evt);
    clearPicturesContainer();
    showNewPhotos();

  };

  var onDiscussedButtonClick = function (evt) {
    resetActiveButton();
    setActiveButton(evt);
    clearPicturesContainer();
    showDiscussedPhotos();
  };

  popularButton.addEventListener('click', onPopularButtonClick);
  newButton.addEventListener('click', onNewButtonClick);
  discussedButton.addEventListener('click', onDiscussedButtonClick);

})();
