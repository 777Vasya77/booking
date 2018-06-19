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
    createPinsList: function (pinsData) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pinsData.length; i++) {
        var pin = renderPin(pinsData[i]);

        pin.addEventListener('click', function (evt) {
          window.map.openFullInfoPopup(evt);
        });

        fragment.appendChild(pin);
      }

      return fragment;
    }
  };

}());
