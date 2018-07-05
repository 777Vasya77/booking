'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var mapBorder = {
    top: 130,
    left: 0,
    bottom: 630,
    right: map.offsetWidth - mapPinMain.offsetWidth
  };

  var onPopupEscPress = function (evt) {
    if (window.utils.isEscKeycode(evt.keyCode)) {
      window.map.closePopup();
      window.pin.inactiveAll();
    }
  };

  var onMapPinMainMouseUp = function () {
    if (mapBlock.classList.contains('map--faded')) {
      pageActivate();
    }
  };

  var onCloseFullInfoPopupClick = function () {
    window.map.closePopup();
    window.pin.inactiveAll();
  };

  var onMapPinMainKeyDown = function (evt) {
    if (window.utils.isEnterKeycode(evt.keyCode) && mapBlock.classList.contains('map--faded')) {
      pageActivate();
    }
  };

  var pageActivate = function () {
    adForm.classList.remove('ad-form--disabled');
    mapBlock.classList.remove('map--faded');
    window.utils.disabledEToggle(window.form.elements);
    window.pin.createList();
    window.filters.elementsToggle();
  };

  window.form.addAddressToInput(mapPinMain);
  window.utils.disabledEToggle(window.form.elements);

  mapPinMain.addEventListener('keydown', onMapPinMainKeyDown);
  mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);

  var checkMapBorder = function (shift) {
    var pinMainPosLeft = mapPinMain.offsetLeft - shift.x;
    var pinMainPosTop = mapPinMain.offsetTop - shift.y;

    pinMainPosLeft = Math.max(pinMainPosLeft, mapBorder.left);
    pinMainPosLeft = Math.min(pinMainPosLeft, mapBorder.right);
    mapPinMain.style.left = pinMainPosLeft + 'px';

    pinMainPosTop = Math.max(pinMainPosTop, mapBorder.top);
    pinMainPosTop = Math.min(pinMainPosTop, mapBorder.bottom);
    mapPinMain.style.top = pinMainPosTop + 'px';
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      checkMapBorder(shift);

      window.form.addAddressToInput(mapPinMain);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    openPopup: function (evt, adsData) {

      window.pin.inactiveAll();

      var target = evt.currentTarget;
      window.pin.active(target);

      var img = target.querySelector('img');

      var ad = adsData.filter(function (elem) {
        return elem.author.avatar === img.getAttribute('src');
      });

      var adElem = window.card.renderAd(ad[0]);

      window.map.closePopup();

      mapBlock.insertBefore(adElem, mapFilter);

      var closeFullInfoPopup = adElem.querySelector('.popup__close');

      closeFullInfoPopup.addEventListener('click', onCloseFullInfoPopupClick);
      document.addEventListener('keydown', onPopupEscPress);
    },

    closePopup: function () {
      var popup = document.querySelector('.map__card');

      if (popup) {
        popup.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      }
    }
  };

}());
