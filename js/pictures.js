'use strict';

var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var descriptionsList = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];

var getRandInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandElement = function (arr) {
  return arr[getRandInt(1, arr.length)]
};

var getComments = function () {
  var commentsAmount = getRandInt(1, 2);
  var comments = [];

  for (var i = 0; i < commentsAmount; i++) {
    comments.push(getRandElement(commentsList))
  }

  return comments;
}

for (var i = 0; i < 25; i++) {
  photos.push(
    {
      url: 'photos/' + i,
      likes: getRandInt(15, 250),
      comments: getComments(),
      description: getRandElement(descriptionsList),
    }
  )
}
