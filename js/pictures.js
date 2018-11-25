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
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandElement = function (arr) {
  return arr[getRandInt(0, arr.length - 1)];
};

var getComments = function (amount) {
  var comments = [];

  for (var i = 0; i < amount; i++) {
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

var renderPhotoCard = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', photo.url);
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;

  return pictureElement;
};

var photoCards = getPhotos();

var showPhotoCards = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoCards.length; i++) {
    fragment.appendChild(renderPhotoCard(photoCards[i]));
  }

  picturesElement.appendChild(fragment);
};

var showBigPictureDiaolog = function () {
  var bigPictureDiaolog = document.querySelector('.big-picture');
  bigPictureDiaolog.classList.remove('hidden');

  document.querySelector('.big-picture__img').children[0].setAttribute('src', photoCards[0].url);
  document.querySelector('.likes-count').textContent = photoCards[0].likes;
  document.querySelector('.comments-count').textContent = photoCards[0].comments.length;

  var socialComments = document.querySelector('.social__comments');
  socialComments.innerHTML = '';

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photoCards[0].comments.length; i++) {
    var newComment = document.createElement('li');
    newComment.className = 'social__comment';
    newComment.innerHTML = '<img><p></p>';
    fragment.appendChild(newComment);
  }
  fragment.querySelector('img').setAttribute('alt', 'Аватар комментатора фотографии');

  socialComments.appendChild(fragment);

};




showPhotoCards();
showBigPictureDiaolog();
