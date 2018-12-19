'use strict';

(function () {

  var documentBody = document.body;
  var bigPictureDiaolog = document.querySelector('.big-picture');
  var bigPictureDiaologCancelButton = bigPictureDiaolog.querySelector('#picture-cancel');
  var socialComments = bigPictureDiaolog.querySelector('.social__comments');
  var showedCommentsCount = bigPictureDiaolog.querySelector('.showed-comments-count');
  var commentsLoaderButton = bigPictureDiaolog.querySelector('.comments-loader');

  var commentsHtml = [];

  var renderComment = function (comment) {
    var newComment = socialComments.querySelector('.social__comment').cloneNode(true);
    var userAvatar = newComment.querySelector('img');

    userAvatar.src = comment.avatar;
    userAvatar.alt = comment.name;

    newComment.querySelector('p').textContent = comment.message;

    return newComment;
  };

  var getCommentsHtml = function (commentArr) {

    var commentElems = commentArr.
      map(function (it) {
        return renderComment(it);
      });

    socialComments.innerHTML = '';

    return commentElems;
  };

  var showComments = function () {

    var fragment = document.createDocumentFragment();
    var commentsAmount = commentsHtml.length <= 5 ? commentsHtml.length : 5;

    commentsHtml.splice(0, commentsAmount).forEach(function (it) {
      fragment.appendChild(it);
    });
    showCommentsLoader();

    socialComments.appendChild(fragment);
    showedCommentsCount.textContent = socialComments.querySelectorAll('.social__comment').length;
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

  var onCommentsLoaderButtonClick = function () {
    if (commentsHtml.length > 0) {
      showComments();
      hideCommentsLoader();
    }
  };

  var hideCommentsLoader = function () {
    if (commentsHtml.length <= 0) {
      commentsLoaderButton.classList.add('hidden');
    }
  };

  var showCommentsLoader = function () {
    if (commentsHtml.length > 0) {
      commentsLoaderButton.classList.remove('hidden');
    }
  };

  var showBigPicDiaolog = function (pictureID) {
    var photoCard = window.photoPreviews.getPhotoCards()[pictureID];
    commentsHtml = getCommentsHtml(photoCard.comments);

    showPictureStatistic(photoCard);
    showComments();
    showPictureDescription(photoCard);

    documentBody.classList.add('modal-open');
    bigPictureDiaolog.classList.remove('hidden');
    bigPictureDiaolog.querySelector('.big-picture__img').children[0].src = photoCard.url;

    bigPictureDiaologCancelButton.addEventListener('click', closeBigPicDialog);
    document.addEventListener('keydown', onBigPicDialogEscPress);
    commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
  };

  var closeBigPicDialog = function () {
    documentBody.classList.remove('modal-open');
    bigPictureDiaolog.classList.add('hidden');
    bigPictureDiaologCancelButton.removeEventListener('click', closeBigPicDialog);
    document.removeEventListener('keydown', onBigPicDialogEscPress);
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  };

  window.onPictureClick = function (evt) {
    var target = evt.currentTarget;
    showBigPicDiaolog(target.id);
  };

})();
