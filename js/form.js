'use strict';

(function () {

  var PRICE_BY_TYPE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };
  var PIN_SHARP_END_HEIGHT = 22;
  var adForm = document.querySelector('.ad-form');
  var mapBlock = document.querySelector('.map');
  var offerType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var time = adForm.querySelector('.ad-form__element--time');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var success = document.querySelector('.success');
  var reset = document.querySelector('.ad-form__reset');
  var mapPinMain = document.querySelector('.map__pin--main');

  var onAdFromInvalid = function (evt) {
    var target = evt.target;
    target.style.borderColor = '#ff0000';
    window.validate.customErrorsMessage(target);
    target.addEventListener('keydown', function () {
      removeError(target);
    });
  };

  var onAdFormSubmit = function (evt) {
    window.backend.sendData(new FormData(adForm), function () {
      showStatusMessage();
      formReset();
    }, function (error) {
      showStatusMessage(error);
      formReset();
    });
    evt.preventDefault();
  };

  var onOfferTypeChange = function (evt) {
    var priceValue = PRICE_BY_TYPE[evt.target.value];

    price.placeholder = priceValue;
    price.min = priceValue;
  };

  var onTimeChange = function (evt) {
    timein.value = evt.target.value;
    timeout.value = evt.target.value;
  };

  var onRoomNumberCapacityChange = function () {
    removeError(capacity);
    window.validate.checkRoomCapacity();
  };

  var showStatusMessage = function (error) {
    success.classList.remove('hidden');

    if (error) {
      success.querySelector('.success__message').textContent = error;
    }

    success.addEventListener('click', function () {
      success.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (window.utils.isEscKeycode(evt.keyCode)) {
        success.classList.add('hidden');
      }
    });
  };

  var formReset = function () {
    adForm.reset();

    mapPinMain.style.left = '570px';
    mapPinMain.style.top = '375px';

    window.form.addAddressToInput(mapPinMain);
    window.pin.delete();
    window.map.closePopup();
    window.filters.reset();
    window.utils.disabledEToggle(window.form.elements);
    adForm.classList.add('ad-form--disabled');
    mapBlock.classList.add('map--faded');
  };

  reset.addEventListener('click', function () {
    formReset();
  });

  var removeError = function (input) {
    input.style.borderColor = '#d9d9d3';
  };

  window.validate.checkRoomCapacity();

  adForm.addEventListener('invalid', onAdFromInvalid, true);

  adForm.addEventListener('submit', onAdFormSubmit);

  offerType.addEventListener('change', onOfferTypeChange);

  time.addEventListener('change', onTimeChange);

  roomNumber.addEventListener('change', onRoomNumberCapacityChange);

  capacity.addEventListener('change', onRoomNumberCapacityChange);

  window.form = {
    elements: adForm.querySelectorAll('fieldset'),

    addAddressToInput: function (pin) {
      var addressInput = document.querySelector('#address');
      var pinImg = pin.querySelector('img');

      var pinHeight = pinImg.offsetHeight;
      var pinWidth = pinImg.offsetWidth;

      addressInput.value = (pin.offsetLeft + pinWidth / 2) + ', ' + (pin.offsetTop + pinHeight + PIN_SHARP_END_HEIGHT);
    }
  };

}());
