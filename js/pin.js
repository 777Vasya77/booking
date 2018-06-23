'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;

    return pinElement;
  };

  window.pin = {
    data: [],
    createPinsList: function () {
      var mapPinsBlock = document.querySelector('.map__pins');

      window.backend.getData(function (response) {

        var fragment = document.createDocumentFragment();
        for (var i = 0; i < response.length; i++) {
          var pin = renderPin(response[i]);

          pin.addEventListener('click', function (evt) {
            window.map.openFullInfoPopup(evt, response);
          });

          fragment.appendChild(pin);
        }

        mapPinsBlock.appendChild(fragment);
      });
    },
    deletePins: function () {
      var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');

      pins.forEach(function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          pin.remove();
        }
      });
    }
  };

}());
