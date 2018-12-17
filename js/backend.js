'use strict';

(function () {

  var STATUS_OK = 200;

  var URLs = {
    formSubmit: 'https://js.dump.academy/kekstagram',
    getData: 'https://js.dump.academy/kekstagram/data'
  };

  var statusToMessage = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено',
    '408': 'Истекло время ожидания',
    '500': 'Ошибка на сервере'
  };

  var getXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(statusToMessage[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  window.backend = {

    upload: function (data, onLoad, onError) {
      var xhr = getXHR(onLoad, onError);
      xhr.open('POST', URLs.formSubmit);
      xhr.send(data);
    },

    download: function (onLoad, onError) {
      var xhr = getXHR(onLoad, onError);
      xhr.open('GET', URLs.getData);
      xhr.send();
    }

  };

})();
