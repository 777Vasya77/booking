'use strict';

(function () {

  var MIN_GUEST = 0;
  var MAX_ROOM = 100;
  var PRICE_BY_TYPE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };
  var PIN_SHARP_END_HEIGHT = 22;
  var adForm = document.querySelector('.ad-form');
  var offerType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var time = adForm.querySelector('.ad-form__element--time');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var customErrorsMessage = function (input) {
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

    checkRoomCapacity();
  };

  var checkRoomCapacity = function () {
    var roomCount = +roomNumber.value;
    var guestCount = +capacity.value;

    if (roomCount < guestCount || (guestCount === MIN_GUEST && roomCount < MAX_ROOM)) {
      capacity.setCustomValidity('Не допустимое количество гостей!');
    } else if (roomCount >= MAX_ROOM && guestCount !== MIN_GUEST) {
      capacity.setCustomValidity('Гостей не предусмотрено!');
    } else {
      capacity.setCustomValidity('');
    }
  };

  adForm.addEventListener('invalid', function (evt) {
    var target = evt.target;
    target.style.borderColor = '#ff0000';

    customErrorsMessage(target);

    target.addEventListener('keydown', function () {
      removeError(target);
    });

  }, true);

  var removeError = function (input) {
    input.style.borderColor = '#d9d9d3';
  };

  offerType.addEventListener('change', function (evt) {
    var priceValue = PRICE_BY_TYPE[evt.target.value];

    price.placeholder = priceValue;
    price.min = priceValue;
  });

  time.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
    timeout.value = evt.target.value;
  });

  roomNumber.addEventListener('change', function () {
    removeError(capacity);
    checkRoomCapacity();
  });

  capacity.addEventListener('change', function () {
    removeError(capacity);
    checkRoomCapacity();
  });

  window.form = {
    addAddressToInput: function (pin) {
      var addressInput = document.querySelector('#address');
      var pinImg = pin.querySelector('img');

      var pinHeight = pinImg.offsetHeight;
      var pinWidth = pinImg.offsetWidth;

      addressInput.value = (pin.offsetLeft + pinWidth / 2) + ', ' + (pin.offsetTop + pinHeight + PIN_SHARP_END_HEIGHT);
    }
  };

}());
