'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAP_TOP_BORDER = 130;
  var MAP_BOTTOM_BORDER = 630;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapBlock = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.closePopup();
    }
  };

  var pageActivate = function () {
    adForm.classList.remove('ad-form--disabled');
    mapBlock.classList.remove('map--faded');
    window.utils.disabledEToggle(window.form.elements);
    window.pin.createPinsList();
  };

  window.form.addAddressToInput(mapPinMain);
  window.utils.disabledEToggle(window.form.elements);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && mapBlock.classList.contains('map--faded')) {
      pageActivate();
    }
  });

  mapPinMain.addEventListener('mouseup', function () {
    if (mapBlock.classList.contains('map--faded')) {
      pageActivate();
    }
  });

  var checkMapBorder = function (shift) {
    if (mapPinMain.offsetTop - shift.y > MAP_BOTTOM_BORDER) {
      mapPinMain.style.top = MAP_BOTTOM_BORDER + 'px';
    } else if (mapPinMain.offsetTop - shift.y < MAP_TOP_BORDER) {
      mapPinMain.style.top = MAP_TOP_BORDER + 'px';
    } else {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }

    if (mapPinMain.offsetLeft - shift.x <= 0) {
      mapPinMain.style.left = '0px';
    } else if (mapPinMain.offsetLeft - shift.x > (map.offsetWidth - mapPinMain.offsetWidth)) {
      mapPinMain.style.left = (map.offsetWidth - mapPinMain.offsetWidth) + 'px';
    } else {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }
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
    openFullInfoPopup: function (evt, adsData) {
      var target = evt.currentTarget;
      var img = target.querySelector('img');

      var ad = adsData.filter(function (elem) {
        return elem.author.avatar === img.getAttribute('src');
      });

      var adElem = window.card.renderAd(ad[0]);

      window.map.closePopup();

      mapBlock.insertBefore(adElem, mapFilter);

      var closeFullInfoPopup = adElem.querySelector('.popup__close');

      closeFullInfoPopup.addEventListener('click', function () {
        window.map.closePopup();
      });
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
