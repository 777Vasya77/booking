'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var AUTHOR_AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
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
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var generateRandomNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

var getRandomArrayItem = function (array) {
  var item = array[Math.floor(Math.random() * array.length)];

  return item;
};

var returnTypeTitle = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return 'Дворец';
  }
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
  var randomArray = [];
  for (var i = 0; i < arrayLength; i++) {
    randomArray[i] = array[i];
  }

  return randomArray;
};

var clearNode = function (node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }

  return node;
};

var createFakeData = function (adsCount) {
  var ads = [];
  for (var i = 0; i < adsCount; i++) {
    var lacoationX = generateRandomNumber(300, 900);
    var lacoationY = generateRandomNumber(130, 630);

    ads.push({
      author: {
        avatar: AUTHOR_AVATARS[i]
      },
      offer: {
        title: OFFER_TITLES[i],
        address: lacoationX + ', ' + lacoationY,
        price: generateRandomNumber(1000, 1000000),
        type: getRandomArrayItem(OFFER_TYPES),
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

var renderFeatures = function (features) {
  var featuresList = mapCardTemplate.querySelector('.popup__features');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var feature = featuresList.querySelector('.popup__feature--' + features[i]).cloneNode(true);
    fragment.appendChild(feature);
  }

  return fragment;
};

var mapCardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');

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
  adElement.querySelector('.popup__type').textContent = returnTypeTitle(ad.offer.type);
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
var mapPinsBlock = document.querySelector('.map__pins');

var mapBlock = document.querySelector('.map');
var mapFilter = document.querySelector('.map__filters-container');

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

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
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

var mapPinMain = document.querySelector('.map__pin--main');

addAddressToInput(mapPinMain);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pageActivate();
  }
});

mapPinMain.addEventListener('mouseup', function () {
  pageActivate();
});


