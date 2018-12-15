'use strict';

(function () {

  var URL = {
    formSubmit: 'https://js.dump.academy/kekstagram',
    getData: 'https://js.dump.academy/kekstagram/data'
  };

  // var Code = {
  //   200: 'OK',
  //   401: 'Не выполнена авторизация пользователя',
  // };

  window.backend = {

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr.response);
        }
      });

      xhr.addEventListener('timeout', function () {
        onError(xhr.response);
      });

      xhr.timeout = 10000;

      xhr.open('POST', URL.formSubmit);
      xhr.send(data);
    },

    download: function (onLoad /* onError */) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL.getData);

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
        // нужно обработать ошибки...
      });

      xhr.send();
    }

  };

})();
