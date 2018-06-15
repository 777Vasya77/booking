'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var AUTHOR_COUNT = 8;
  var MIN_GUEST = 0;
  var MAX_ROOM = 100;
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var OFFER_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var PRICE_BY_TYPE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinTemplate = document.querySelector('#map-card-template').content.querySelector('.map__pin');
  var mapCardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');
  var mapPinsBlock = document.querySelector('.map__pins');
  var mapBlock = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters-container');
  var offerType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var time = adForm.querySelector('.ad-form__element--time');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var generateAuthorAvatars = function (authorCount) {
    var authorAvatars = [];

    for (var i = 1; i <= authorCount; i++) {
      authorAvatars.push('img/avatars/user0' + i + '.png');
    }

    return authorAvatars;
  };

  var generateRandomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  };

  var getRandomArrayItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomObjKey = function (obj) {
    var keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  var returnTitle = function (objKey, obj) {
    var title;

    for (var key in obj) {
      if (key === objKey) {
        title = obj[objKey];
      }
    }

    return title;
  };

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var item = array[randomIndex];
      array[randomIndex] = array[i];
      array[i] = item;
    }

    return array;
  };

  var createRandomLengthArray = function (array) {
    var arrayLength = generateRandomNumber(1, array.length);
    return array.slice(0, arrayLength - 1);
  };

  var clearNode = function (node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }

    return node;
  };

  var createFakeData = function (adsCount) {
    var ads = [];
    var authorAvatars = generateAuthorAvatars(AUTHOR_COUNT);
    for (var i = 0; i < adsCount; i++) {
      var lacoationX = generateRandomNumber(300, 900);
      var lacoationY = generateRandomNumber(130, 630);

      ads.push({
        author: {
          avatar: authorAvatars[i]
        },
        offer: {
          title: OFFER_TITLES[i],
          address: lacoationX + ', ' + lacoationY,
          price: generateRandomNumber(1000, 1000000),
          type: getRandomObjKey(OFFER_TYPES),
          rooms: generateRandomNumber(2, 4),
          guests: generateRandomNumber(2, 4),
          checkin: getRandomArrayItem(OFFER_TIMES),
          checkout: getRandomArrayItem(OFFER_TIMES),
          features: createRandomLengthArray(OFFER_FEATURES),
          description: '',
          photos: shuffleArray(OFFER_PHOTOS)
        },
        location: {
          x: lacoationX,
          y: lacoationY
        }
      });
    }

    return ads;
  };

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = pin.location.x + (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;

    return pinElement;
  };

  var renderFeatures = function (features) {
    var featuresList = mapCardTemplate.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var feature = featuresList.querySelector('.popup__feature--' + features[i]).cloneNode(true);
      fragment.appendChild(feature);
    }

    return fragment;
  };

  var renderPhotos = function (photos) {
    var photoTemplate = mapCardTemplate.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photos[i];
      fragment.appendChild(photoElement);
    }

    return fragment;
  };

  var renderAd = function (ad) {
    var adElement = mapCardTemplate.cloneNode(true);

    adElement.querySelector('.popup__title').textContent = ad.offer.title;
    adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = returnTitle(ad.offer.type, OFFER_TYPES);
    adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    clearNode(adElement.querySelector('.popup__features')).appendChild(renderFeatures(ad.offer.features));
    adElement.querySelector('.popup__description').textContent = ad.offer.description;
    clearNode(adElement.querySelector('.popup__photos')).appendChild(renderPhotos(ad.offer.photos));
    adElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return adElement;
  };

  var createPinsList = function (pinsData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinsData.length; i++) {
      var pin = renderPin(pinsData[i]);

      pin.addEventListener('click', function (evt) {
        openFullInfoPopup(evt);
      });

      fragment.appendChild(pin);
    }

    return fragment;
  };

  var adsData = createFakeData(8);

  var openFullInfoPopup = function (evt) {
    var target = evt.currentTarget;
    var img = target.querySelector('img');

    var ad = adsData.filter(function (elem) {
      return elem.author.avatar === img.getAttribute('src');
    });

    var adElem = renderAd(ad[0]);

    closePopup();

    mapBlock.insertBefore(adElem, mapFilter);

    var closeFullInfoPopup = adElem.querySelector('.popup__close');

    closeFullInfoPopup.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var popup = document.querySelector('.map__card');

    if (popup) {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var toggleDisabledAttr = function (elems) {
    elems.forEach(function (elem) {
      elem.disabled = !elem.disabled;
    });
  };

  toggleDisabledAttr(adFormFieldsets);

  var pageActivate = function () {
    adForm.classList.remove('ad-form--disabled');
    mapBlock.classList.remove('map--faded');
    mapPinsBlock.appendChild(createPinsList(adsData));
    toggleDisabledAttr(adFormFieldsets);
  };

  var addAddressToInput = function (pin) {
    var addressInput = document.querySelector('#address');
    var pinImg = pin.querySelector('img');

    var pinHeight = pinImg.offsetHeight;
    var pinWidth = pinImg.offsetWidth;

    addressInput.value = (pin.offsetLeft + pinWidth / 2) + ', ' + (pin.offsetTop + pinHeight / 2);
  };

  addAddressToInput(mapPinMain);

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pageActivate();
    }
  });

  mapPinMain.addEventListener('mouseup', function () {
    pageActivate();
  });

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
    var priceValue = returnTitle(evt.target.value, PRICE_BY_TYPE);

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

}());
