'use strict';

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
showBigPictureDiaolog(photoCards[0]);
hideCommentsStat();
