'use strict';

(function () {

  var STATUS_CODE = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404
  };

  var checkStatus = function (xhr, onLoad) {
    var error;
    switch (xhr.status) {
      case STATUS_CODE.success:
        onLoad(xhr.response);
        break;

      case STATUS_CODE.badRequest:
        error = 'Неверный запрос';
        break;
      case STATUS_CODE.unauthorized:
        error = 'Пользователь не авторизован';
        break;
      case STATUS_CODE.notFound:
        error = 'Ничего не найдено';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    return error;
  };

  window.backend = {
    getData: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (checkStatus(xhr, onLoad)) {
          onError(checkStatus(xhr, onLoad));
        }
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', URL);
      xhr.send();
    },

    sendData: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (checkStatus(xhr, onLoad)) {
          onError(checkStatus(xhr, onLoad));
        }
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

}());
