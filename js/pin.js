'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAX_DISPLAY_PIN = 5;
  var pinsData;
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;

    return pinElement;
  };

  var update = function () {
    window.pin.delete();
    window.map.closePopup();
    renderPinList(window.filters.getPins(pinsData));
  };

  var renderPinList = function (data) {
    var fragment = document.createDocumentFragment();
    var dataLength = (data.length < MAX_DISPLAY_PIN) ? data.length : MAX_DISPLAY_PIN;

    for (var i = 0; i < dataLength; i++) {
      var pin = renderPin(data[i]);

      pin.addEventListener('click', function (evt) {
        window.map.openPopup(evt, data);
      });

      fragment.appendChild(pin);
    }

    mapPinsBlock.appendChild(fragment);
  };

  var onSuccess = function (response) {
    pinsData = response;
    renderPinList(pinsData);
    window.filters.elementsToggle();
  };

  window.pin = {
    update: update,
    createList: function () {
      window.backend.getData(onSuccess);
    },

    delete: function () {
      var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');

      pins.forEach(function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          pin.remove();
        }
      });
    },

    active: function (pin) {
      pin.classList.add('map__pin--active');
    },

    inactiveAll: function () {
      document.querySelectorAll('.map__pin').forEach(function (pin) {
        pin.classList.remove('map__pin--active');
        pin.blur();
      });
    }
  };

}());
