'use strict';

(function () {

  var MIN_GUEST = 0;
  var MAX_ROOM = 100;
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  window.validate = {

    customErrorsMessage: function (input) {
      if (input.validity.valueMissing) {
        input.setCustomValidity('Обязательное поле!');
      } else if (input.validity.tooShort) {
        var minlength = input.getAttribute('minlength');
        input.setCustomValidity('Поле должно быть не менше ' + minlength + ' символов!');
      } else if (input.validity.toLong) {
        var maxlength = input.getAttribute('maxlength');
        input.setCustomValidity('Поле должно быть не больше ' + maxlength + ' символов!');
      } else if (input.validity.rangeUnderflow) {
        var min = input.getAttribute('min');
        input.setCustomValidity('Поле должна быть не меньше ' + min);
      } else {
        input.setCustomValidity('');
      }

      window.validate.checkRoomCapacity();
    },

    checkRoomCapacity: function () {
      var roomCount = +roomNumber.value;
      var guestCount = +capacity.value;

      if (roomCount < guestCount || (guestCount === MIN_GUEST && roomCount < MAX_ROOM)) {
        capacity.setCustomValidity('Не допустимое количество гостей!');
      } else if (roomCount >= MAX_ROOM && guestCount !== MIN_GUEST) {
        capacity.setCustomValidity('Гостей не предусмотрено!');
      } else {
        capacity.setCustomValidity('');
      }
    }

  };

}());
