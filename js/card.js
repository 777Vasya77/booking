'use strict';

(function () {

  var OFFER_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var mapCardTemplate = document.querySelector('#map-card-template').content.querySelector('.map__card');

  var renderFeatures = function (features) {
    var featuresList = mapCardTemplate.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();

    features.forEach(function (it) {
      var feature = featuresList.querySelector('.popup__feature--' + it).cloneNode(true);
      fragment.appendChild(feature);
    });

    return fragment;
  };

  var renderPhotos = function (photos) {
    var photoTemplate = mapCardTemplate.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      fragment.appendChild(photoElement);
    });

    return fragment;
  };

  window.card = {
    renderAd: function (ad) {
      var adElement = mapCardTemplate.cloneNode(true);

      adElement.querySelector('.popup__title').textContent = ad.offer.title;
      adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
      adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
      adElement.querySelector('.popup__type').textContent = OFFER_TYPES[ad.offer.type];
      adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      window.utils.clearNode(adElement.querySelector('.popup__features')).appendChild(renderFeatures(ad.offer.features));
      adElement.querySelector('.popup__description').textContent = ad.offer.description;
      window.utils.clearNode(adElement.querySelector('.popup__photos')).appendChild(renderPhotos(ad.offer.photos));
      adElement.querySelector('.popup__avatar').src = ad.author.avatar;

      return adElement;
    }
  };

}());
