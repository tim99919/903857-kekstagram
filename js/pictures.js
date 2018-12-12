// 'use strict';

// var ESC_KEYCODE = 27;

// var COMMENTS = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];
// var DESCRIPTIONS = [
//   'Тестим новую камеру!',
//   'Затусили с друзьями на море',
//   'Как же круто тут кормят',
//   'Отдыхаем...',
//   'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
//   'Вот это тачка!'
// ];

// var picturesElement = document.querySelector('.pictures');
// var socialComments = document.querySelector('.social__comments');
// var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// var imgUploadSection = document.querySelector('.img-upload');
// var imgUploadFile = imgUploadSection.querySelector('#upload-file');
// var imgUploadDialog = imgUploadSection.querySelector('.img-upload__overlay');
// var imgUploadCancelButton = imgUploadSection.querySelector('.cancel');
// var imgUploadHashtagsInput = imgUploadDialog.querySelector('.text__hashtags');
// var imgUploadDescriptionInput = imgUploadDialog.querySelector('.text__description');
// var effectLevel = imgUploadDialog.querySelector('.effect-level');
// var effectLevelLine = effectLevel.querySelector('.effect-level__line');
// var effectLevelValue = effectLevel.querySelector('.effect-level__value');
// var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
// var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');
// var uploadedPhoto = imgUploadDialog.querySelector('img');
// var bigPictureDiaolog = document.querySelector('.big-picture');
// var bigPictureDiaologCancelButton = bigPictureDiaolog.querySelector('#picture-cancel');
// var effects = imgUploadDialog.querySelectorAll('.effects__radio');
// var uploadFormInputs = imgUploadSection.querySelectorAll('input');
// var pictures = [];

// var getRandInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// var getRandElement = function (arr) {
//   return arr[getRandInt(0, arr.length - 1)];
// };

// var getComments = function (count) {
//   var comments = [];

//   for (var i = 0; i < count; i++) {
//     comments.push(getRandElement(COMMENTS));
//   }

//   return comments;
// };

// var getPhotos = function () {
//   var photos = [];
//   for (var i = 1; i <= 25; i++) {
//     photos.push(
//         {
//           url: 'photos/' + i + '.jpg',
//           likes: getRandInt(15, 250),
//           comments: getComments(getRandInt(1, 2)),
//           description: getRandElement(DESCRIPTIONS),
//         }
//     );
//   }

//   return photos;
// };

// var photoCards = getPhotos();

// var renderPhotoCard = function (i) {
//   var pictureElement = pictureTemplate.cloneNode(true);
//   pictureElement.id = i;
//   pictureElement.querySelector('img').setAttribute('src', photoCards[i].url);
//   pictureElement.querySelector('.picture__likes').textContent = photoCards[i].likes;
//   pictureElement.querySelector('.picture__comments').textContent = photoCards[i].comments.length;

//   return pictureElement;
// };

// var showPhotoCards = function () {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < photoCards.length; i++) {
//     fragment.appendChild(renderPhotoCard(i));
//   }

//   picturesElement.appendChild(fragment);
//   pictures = picturesElement.querySelectorAll('.picture');
//   addListeners(pictures, 'click', onPictureClick);
// };

// var setSocialAvatar = function (avatar) {
//   avatar.setAttribute('src', 'img/avatar-' + getRandInt(1, 6) + '.svg');
// };

// var setSocialText = function (comment, content) {
//   comment.textContent = content;
// };

// var renderComment = function (picture, i) {
//   var newComment = socialComments.querySelector('.social__comment').cloneNode(true);
//   setSocialAvatar(newComment.querySelector('img'));
//   setSocialText(newComment.querySelector('p'), picture.comments[i]);

//   return newComment;
// };

// var showComments = function (picture) {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < picture.comments.length; i++) {
//     fragment.appendChild(renderComment(picture, i));
//   }

//   socialComments.innerHTML = '';
//   socialComments.appendChild(fragment);
// };

// var showPictureStatistic = function (picture) {
//   document.querySelector('.likes-count').textContent = picture.likes;
//   document.querySelector('.comments-count').textContent = picture.comments.length;
// };

// var showPictureDescription = function (picture) {
//   document.querySelector('.social__caption').textContent = picture.description;
// };

// var hideCommentsStat = function () {
//   document.querySelector('.social__comment-count').classList.add('visually-hidden');
//   document.querySelector('.comments-loader').classList.add('visually-hidden');
// };

// var clearForm = function () {
//   for (var i = 0; i < uploadFormInputs.length; i++) {
//     uploadFormInputs[i].value = '';
//   }
// };

// var setPhotoStyle = function (value) {
//   var effect = uploadedPhoto.className.substr(18);

//   effectLevelValue.value = value;

//   switch (effect) {
//     case 'chrome':
//       uploadedPhoto.style.filter = 'grayscale(' + value / 100 + ')';
//       break;

//     case 'sepia':
//       uploadedPhoto.style.filter = 'sepia(' + value / 100 + ')';
//       break;

//     case 'marvin':
//       uploadedPhoto.style.filter = 'invert(' + value + '%)';
//       break;

//     case 'phobos':
//       uploadedPhoto.style.filter = 'blur(' + (value / 100 * 2 + 1) + 'px)';
//       break;

//     case 'heat':
//       uploadedPhoto.style.filter = 'brightness(' + value / 100 * 3 + ')';
//       break;

//     default:
//       uploadedPhoto.style.filter = '';
//       break;
//   }
//   uploadedPhoto.style.webkitFilter = uploadedPhoto.style.filter;
// };

// var setDefaultPhotoStyle = function () {
//   uploadedPhoto.style.filter = '';
//   effectLevelValue.value = 100;
//   effectLevelPin.style.left = 100 + '%';
//   effectLevelDepth.style.width = 100 + '%';
// };

// var showEffectLevel = function (effect) {
//   if (effect === 'none') {
//     effectLevel.classList.add('hidden');
//   } else {
//     effectLevel.classList.remove('hidden');
//   }
// };

// var hashtagsInputCustomValidation = function (evt) {
//   var target = evt.target;
//   var hashtagsStr = target.value;
//   var hashtags = target.value.split(' ');
//   var rules = [];
//   var hashtag;
//   var isSharp = true;
//   var wrongLength = false;
//   var isReapeat = false;

//   for (var i = 0; i < hashtags.length; i++) {
//     hashtag = hashtags[i];
//     if (!/#/.test(hashtag[0])) {
//       isSharp = false;
//       break;
//     }
//     if (hashtag.length < 2 || hashtag.length > 20) {
//       wrongLength = true;
//       break;
//     }
//     if (hashtags.length > 1) {
//       for (var j = i + 1; j < hashtags.length; j++) {
//         var anotherHashtag = hashtags[j];
//         if (hashtag.toLowerCase() === anotherHashtag.toLowerCase()) {
//           isReapeat = true;
//           break;
//         }
//       }
//     }
//   }

//   if (!isSharp) {
//     rules.push('Название хэштэга должно начинаться с символа #');
//   }
//   if (wrongLength) {
//     rules.push('Недопустимая длина хэштэга');
//   }
//   if (hashtags.length > 5) {
//     rules.push('Возможно указать не более 5-ти хэштэгов');
//   }
//   if (isReapeat) {
//     rules.push('Хэштеги не должны повторяться');
//   }
//   if (/\S#/.test(hashtagsStr)) {
//     rules.push('Хэштеги разделяются пробелами');
//   }
//   target.setCustomValidity(rules.join(', '));
// };

// var onImgUploadDialogEscPress = function (evt) {
//   if (evt.keyCode === ESC_KEYCODE) {
//     evt.preventDefault();
//     closeImgUploadDialog();
//   }
// };

// var onHashtagsInputFocus = function () {
//   document.removeEventListener('keydown', onImgUploadDialogEscPress);
//   imgUploadHashtagsInput.addEventListener('input', hashtagsInputCustomValidation);
// };

// var onHashtagsInputBlur = function () {
//   document.addEventListener('keydown', onImgUploadDialogEscPress);
//   imgUploadHashtagsInput.removeEventListener('input', hashtagsInputCustomValidation);
// };

// var onDescriptionInputFocus = function () {
//   document.removeEventListener('keydown', onImgUploadDialogEscPress);
// };

// var onDescriptionInputBlur = function () {
//   document.addEventListener('keydown', onImgUploadDialogEscPress);
// };

// var onBigPicDialogEscPress = function (evt) {
//   if (evt.keyCode === ESC_KEYCODE) {
//     evt.preventDefault();
//     closeBigPicDialog();
//   }
// };

// var onEffectClick = function (evt) {
//   var effect = evt.target.id.substr(7);
//   uploadedPhoto.className = 'effects__preview--' + effect;
//   setDefaultPhotoStyle();
//   showEffectLevel(effect);
// };

// var onPictureClick = function (evt) {
//   var target = evt.currentTarget;
//   showBigPicDiaolog(photoCards[target.id]);
// };

// var onLevelPinDrag = function (evt) {
//   evt.preventDefault();

//   var startCoordinate = evt.clientX;
//   var lineWidth = effectLevelLine.offsetWidth;

//   var getValue = function () {
//     return Math.round(effectLevelPin.offsetLeft / lineWidth * 100);
//   };

//   var onMouseMove = function (moveEvt) {
//     moveEvt.preventDefault();

//     var shift = startCoordinate - moveEvt.clientX;
//     startCoordinate = moveEvt.clientX;

//     if (shift > effectLevelPin.offsetLeft) {
//       effectLevelPin.style.left = '0px';
//     } else if (shift < effectLevelPin.offsetLeft - lineWidth) {
//       effectLevelPin.style.left = lineWidth + 'px';
//     } else {
//       effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
//     }

//     effectLevelDepth.style.width = effectLevelPin.offsetLeft + 'px';
//     setPhotoStyle(getValue());
//   };

//   var onMouseUp = function (upEvt) {
//     upEvt.preventDefault();

//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
//   };

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// };

// var removeListeners = function (elements, operation, action) {
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].removeEventListener(operation, action);
//   }
// };

// var addListeners = function (elements, operation, action) {
//   for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener(operation, action);
//   }
// };

// var openImgUploadDialog = function () {
//   imgUploadDialog.classList.remove('hidden');
//   effectLevel.classList.add('hidden');
//   document.addEventListener('keydown', onImgUploadDialogEscPress);
//   effectLevelPin.addEventListener('mousedown', onLevelPinDrag);
//   imgUploadCancelButton.addEventListener('click', closeImgUploadDialog);
//   imgUploadHashtagsInput.addEventListener('focus', onHashtagsInputFocus);
//   imgUploadHashtagsInput.addEventListener('blur', onHashtagsInputBlur);
//   imgUploadDescriptionInput.addEventListener('focus', onDescriptionInputFocus);
//   imgUploadDescriptionInput.addEventListener('blur', onDescriptionInputBlur);
//   addListeners(effects, 'change', onEffectClick);
// };

// var closeImgUploadDialog = function () {
//   imgUploadDialog.classList.add('hidden');
//   document.removeEventListener('keydown', onImgUploadDialogEscPress);
//   effectLevelPin.removeEventListener('mousedown', onLevelPinDrag);
//   imgUploadCancelButton.removeEventListener('click', closeImgUploadDialog);
//   imgUploadHashtagsInput.removeEventListener('focus', onHashtagsInputFocus);
//   imgUploadHashtagsInput.removeEventListener('blur', onHashtagsInputBlur);
//   imgUploadDescriptionInput.removeEventListener('focus', onDescriptionInputFocus);
//   imgUploadDescriptionInput.removeEventListener('blur', onDescriptionInputBlur);
//   clearForm(uploadFormInputs);
//   removeListeners(effects, 'change', onEffectClick);
// };

// var showBigPicDiaolog = function (picture) {
//   bigPictureDiaolog.classList.remove('hidden');
//   bigPictureDiaolog.querySelector('.big-picture__img').children[0].setAttribute('src', picture.url);
//   bigPictureDiaologCancelButton.addEventListener('click', closeBigPicDialog);
//   document.addEventListener('keydown', onBigPicDialogEscPress);

//   showPictureStatistic(picture);
//   showComments(picture);
//   showPictureDescription(picture);
// };

// var closeBigPicDialog = function () {
//   bigPictureDiaolog.classList.add('hidden');
//   bigPictureDiaologCancelButton.removeEventListener('click', closeBigPicDialog);
//   document.removeEventListener('keydown', onBigPicDialogEscPress);
// };

// showPhotoCards();
// hideCommentsStat();

// imgUploadFile.addEventListener('change', function () {
//   openImgUploadDialog();
// });
