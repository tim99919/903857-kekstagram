'use strict';

(function () {

  var STATUS_OK = 200;
  var TIMEOUT_VALUE = 10000;

  var URLs = {
    formSubmit: 'https://js.dump.academy/kekstagram',
    getData: 'https://js.dump.academy/kekstagram/data'
  };

  var unknownError = 'Неизвестная ошибка';

  var statusToMessage = {
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено',
    '408': 'Истекло время ожидания',
    '500': 'Ошибка на сервере'
  };

  var getErrorText = function (code) {
    return statusToMessage[code] || unknownError;
  };

  var sendRequest = function (data, onLoad, onError) {
    var method = data ? 'POST' : 'GET';
    var url = data ? URLs.formSubmit : URLs.getData;

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(getErrorText(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания');
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {

    upload: function (data, onLoad, onError) {
      sendRequest(data, onLoad, onError);
    },

    download: function (onLoad, onError) {
      sendRequest(null, onLoad, onError);
    }

  };

})();
