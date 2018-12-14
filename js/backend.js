'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  window.backend = {

    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },

  };

})();
