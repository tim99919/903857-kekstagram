'use strict';


(function () {

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

  var getComments = function (count) {
    var comments = [];

    for (var i = 0; i < count; i++) {
      comments.push(window.util.getRandElement(COMMENTS));
    }

    return comments;
  };

  window.photoCards = (function () {
    var photos = [];
    for (var i = 1; i <= 25; i++) {
      photos.push(
          {
            url: 'photos/' + i + '.jpg',
            likes: window.util.getRandInt(15, 250),
            comments: getComments(window.util.getRandInt(1, 2)),
            description: window.util.getRandElement(DESCRIPTIONS),
          }
      );
    }

    return photos;
  })();

})();
