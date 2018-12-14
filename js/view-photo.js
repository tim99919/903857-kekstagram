'use strict';

(function () {

  var documentBody = document.body;
  var bigPictureDiaolog = document.querySelector('.big-picture');
  var bigPictureDiaologCancelButton = bigPictureDiaolog.querySelector('#picture-cancel');
  var socialComments = bigPictureDiaolog.querySelector('.social__comments');

  var renderComment = function (picture, i) {
    var newComment = socialComments.querySelector('.social__comment').cloneNode(true);
    var userAvatar = 'img/avatar-' + window.util.getRandInt(1, 6) + '.svg';
    newComment.querySelector('img').src = userAvatar;
    newComment.querySelector('p').textContent = picture.comments[i];

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
    bigPictureDiaolog.querySelector('.likes-count').textContent = picture.likes;
    bigPictureDiaolog.querySelector('.comments-count').textContent = picture.comments.length;
  };

  var showPictureDescription = function (picture) {
    bigPictureDiaolog.querySelector('.social__caption').textContent = picture.description;
  };

  var onBigPicDialogEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPicDialog);
  };

  var showBigPicDiaolog = function (picture) {
    showPictureStatistic(picture);
    showComments(picture);
    showPictureDescription(picture);

    documentBody.classList.add('modal-open');
    bigPictureDiaolog.classList.remove('hidden');
    bigPictureDiaolog.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPictureDiaologCancelButton.addEventListener('click', closeBigPicDialog);
    document.addEventListener('keydown', onBigPicDialogEscPress);

  };

  var closeBigPicDialog = function () {
    documentBody.classList.remove('modal-open');
    bigPictureDiaolog.classList.add('hidden');
    bigPictureDiaologCancelButton.removeEventListener('click', closeBigPicDialog);
    document.removeEventListener('keydown', onBigPicDialogEscPress);
  };

  (function hideCommentsStat() {
    bigPictureDiaolog.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureDiaolog.querySelector('.comments-loader').classList.add('visually-hidden');
  })();

  window.onPictureClick = function (evt) {
    var target = evt.currentTarget;
    showBigPicDiaolog(window.photoCards[target.id]);
  };

})();
