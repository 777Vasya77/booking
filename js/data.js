'use strict';

(function () {

  var AUTHOR_COUNT = 8;
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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
  var OFFER_TYPES = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var generateAuthorAvatars = function (authorCount) {
    var authorAvatars = [];

    for (var i = 1; i <= authorCount; i++) {
      authorAvatars.push('img/avatars/user0' + i + '.png');
    }

    return authorAvatars;
  };

  window.data = {
    createFakeData: function (adsCount) {
      var ads = [];
      var authorAvatars = generateAuthorAvatars(AUTHOR_COUNT);
      for (var i = 0; i < adsCount; i++) {
        var lacoationX = window.utils.generateRandomNumber(300, 900);
        var lacoationY = window.utils.generateRandomNumber(130, 630);

        ads.push({
          author: {
            avatar: authorAvatars[i]
          },
          offer: {
            title: OFFER_TITLES[i],
            address: lacoationX + ', ' + lacoationY,
            price: window.utils.generateRandomNumber(1000, 1000000),
            type: window.utils.getRandomObjKey(OFFER_TYPES),
            rooms: window.utils.generateRandomNumber(2, 4),
            guests: window.utils.generateRandomNumber(2, 4),
            checkin: window.utils.getRandomArrayItem(OFFER_TIMES),
            checkout: window.utils.getRandomArrayItem(OFFER_TIMES),
            features: window.utils.createRandomLengthArray(OFFER_FEATURES),
            description: '',
            photos: window.utils.shuffleArray(OFFER_PHOTOS)
          },
          location: {
            x: lacoationX,
            y: lacoationY
          }
        });
      }

      return ads;
    }
  };

}());
