'use strict';

(function () {

  var NEW_PHOTO_COUNT = 10;
  var DEBOUNCE_INTERVAL = 500; // ms

  var picturesContainer = document.querySelector('.pictures');
  var imgFiltersElem = document.querySelector('.img-filters');
  var filterButtons = imgFiltersElem.querySelector('.img-filters__form');

  var buttons = imgFiltersElem.querySelectorAll('.img-filters__button');


  var resetActiveButton = function () {
    buttons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  var setActiveButton = function (evt) {
    evt.target.classList.add('img-filters__button--active');
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

  var buttonToAction = {
    'popular': function () {
      var photoCards = window.photoPreviews.getPhotoCards();
      window.photoPreviews.showPhotoCards(photoCards);
    },
    'new': function () {
      var photoCards = getNewPhotos(window.photoPreviews.getPhotoCards());
      window.photoPreviews.showPhotoCards(photoCards.photos, photoCards.IDs);
    },
    'discussed': function () {
      var photoCards = getDiscussedPhotos(window.photoPreviews.getPhotoCards());
      window.photoPreviews.showPhotoCards(photoCards.photos, photoCards.IDs);
    },
  };

  var debouncedOnFilterButtonClick = window.debounce(function (evt) {
    clearPicturesContainer();
    buttonToAction[evt.target.id.substr(7)]();
  }, DEBOUNCE_INTERVAL);

  var onFilterButtonClick = function (evt) {
    resetActiveButton();
    setActiveButton(evt);
    debouncedOnFilterButtonClick(evt);
  };

  filterButtons.addEventListener('click', onFilterButtonClick);

})();
