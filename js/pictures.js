'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];

var picturesElement = document.querySelector('.pictures');
var socialComments = document.querySelector('.social__comments');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var imgUploadSection = document.querySelector('.img-upload');
var imgUploadInput = imgUploadSection.querySelector('#upload-file');
// var buttonImgUpload = imgUpload.querySelector('.img-upload__control');
var imgUploadDialog = imgUploadSection.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadSection.querySelector('.cancel');
var effectLevel = imgUploadDialog.querySelector('.effect-level');
var effectLevelLine = imgUploadDialog.querySelector('.effect-level__line');
var effectLevelValue = imgUploadDialog.querySelector('.effect-level__value');
var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
var effectItems = imgUploadDialog.querySelectorAll('li');
var effectsPreviews = imgUploadDialog.querySelectorAll('.effects__preview');
var uploadPhoto = imgUploadDialog.querySelector('img');
var effects = imgUploadDialog.querySelectorAll('.effects__radio');

var getRandInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandElement = function (arr) {
  return arr[getRandInt(0, arr.length - 1)];
};

var getComments = function (count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    comments.push(getRandElement(COMMENTS));
  }

  return comments;
};

var getPhotos = function () {
  var photos = [];
  for (var i = 1; i <= 25; i++) {
    photos.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: getRandInt(15, 250),
          comments: getComments(getRandInt(1, 2)),
          description: getRandElement(DESCRIPTIONS),
        }
    );
  }

  return photos;
};

var photoCards = getPhotos();

var renderPhotoCard = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var showPhotoCards = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoCards.length; i++) {
    fragment.appendChild(renderPhotoCard(photoCards[i]));
  }

  picturesElement.appendChild(fragment);
};

var setSocialAvatar = function (avatar) {
  avatar.setAttribute('src', 'img/avatar-' + getRandInt(1, 6) + '.svg');
};

var setSocialText = function (comment, content) {
  comment.textContent = content;
};

var renderComment = function (picture, i) {
  var newComment = socialComments.querySelector('.social__comment').cloneNode(true);
  setSocialAvatar(newComment.querySelector('img'));
  setSocialText(newComment.querySelector('p'), picture.comments[i]);

  return newComment;
};

var showComments = function (picture) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(renderComment(picture, i));
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
};

var showPictureStatistic = function (picture) {
  document.querySelector('.likes-count').textContent = picture.likes;
  document.querySelector('.comments-count').textContent = picture.comments.length;
};

var showPictureDescription = function (picture) {
  document.querySelector('.social__caption').textContent = picture.description;
};

var showBigPictureDiaolog = function (picture) {
  var bigPictureDiaolog = document.querySelector('.big-picture');
  bigPictureDiaolog.classList.remove('hidden');
  bigPictureDiaolog.querySelector('.big-picture__img').children[0].setAttribute('src', picture.url);

  showPictureStatistic(picture);
  showComments(picture);
  showPictureDescription(picture);
};

var hideCommentsStat = function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

showPhotoCards();
// showBigPictureDiaolog(photoCards[0]);
hideCommentsStat();

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    closeImgUploadDialog();
  }
};

var onImgUploadCancelClick = function () {
  closeImgUploadDialog();
};

var onImgUploadCancelEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeImgUploadDialog();
  }
};

var onEffectClick = function (evt) {
  var effect = evt.target.id.substr(7);
  uploadPhoto.className = 'effects__preview--' + effect;
  showEffectLevel(effect);
  effectLevelValue.setAttribute('value', 100);
  effectLevelPin.style.left = 100 + '%';
  effectLevelDepth.style.width = 100 + '%';

};

var onLevelLinePinMouseup = function (evt) {
  var effect = uploadPhoto.className.substr(18);
  var value = Math.round(evt.target.offsetLeft / evt.target.offsetParent.offsetWidth * 100);
  effectLevelValue.value = value;

  switch (effect) {
    case 'chrome':
      uploadPhoto.style.webkitFilter = 'grayscale(' + value / 100 + ')';
      uploadPhoto.style.filter = 'grayscale(' + value / 100 + ')';
      break;

    case 'sepia':
      uploadPhoto.style.webkitFilter = 'sepia(' + value / 100 + ')';
      uploadPhoto.style.filter = 'sepia(' + value / 100 + ')';
      break;

    case 'marvin':
      uploadPhoto.style.webkitFilter = 'invert(' + value + '%)';
      uploadPhoto.style.filter = 'invert(' + value + '%)';
      break;

    case 'phobos':
      uploadPhoto.style.webkitFilter = 'blur(' + value / 100 * 2 + 1 + 'px)';
      uploadPhoto.style.filter = 'blur(' + value / 100 * 2 + 1 + 'px)';
      break;

    case 'heat':
      uploadPhoto.style.webkitFilter = 'grayscale(' + value / 100 * 3 + ')';
      uploadPhoto.style.filter = 'grayscale(' + value / 100 * 3 + ')';
      break;

    default:
      uploadPhoto.style.filter = '';
      break;
  }
  console.log(getComputedStyle(uploadPhoto).filter);
};

var openImgUploadDialog = function () {
  imgUploadDialog.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  imgUploadCancel.addEventListener('keydown', onImgUploadCancelEnterPress);

  for (var i = 0; i < effects.length; i++) {
    addOnEffectsClick(effects[i]);
  }

};

var closeImgUploadDialog = function () {
  imgUploadDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  imgUploadCancel.removeEventListener('keydown', onImgUploadCancelEnterPress);
  imgUploadInput.value = '';
  for (var i = 0; i < effects.length; i++) {
    removeOnEffectsClick(effects[i]);
  }
};

var addOnEffectsClick = function (thumbnail) {
  thumbnail.addEventListener('change', onEffectClick);
};

var removeOnEffectsClick = function (thumbnail) {
  thumbnail.removeEventListener('change', onEffectClick);
};

var showEffectLevel = function (effect) {
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
    effectLevelPin.removeEventListener('mouseup', onLevelLinePinMouseup);
  } else {
    effectLevel.classList.remove('hidden');
    effectLevelPin.addEventListener('mouseup', onLevelLinePinMouseup);
  }
};

var initEffectLevel = function () {
  effectLevelLineValue.setAttribute('value', 100);
  setEffectLevel(effectLevelLineValue.value);
};

var setEffectLevel = function (value) {
  effectLevelValue.setAttribute('value', value);
  effectLevelLinePin.style.left = value + '%';
  effectLevelLineDepth.style.width = value + '%';
  effectsPreviews[1].style.filter = 'grayscale(' + value / 100 + ')';
  effectsPreviews[2].style.filter = 'sepia(' + value / 100 + ')';
  effectsPreviews[3].style.filter = 'invert(' + value + '%)';
  effectsPreviews[4].style.filter = 'grayscale(' + value * 3 / 100 + 'px)';
  effectsPreviews[5].style.filter = 'grayscale(' + value * 2 / 100 + 1 + ')';
};

imgUploadInput.addEventListener('change', function () {
  openImgUploadDialog();
});


