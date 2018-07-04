'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };
  var Capacity = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    TREE: 3
  };

  var filter = document.querySelector('.map__filters');
  var type = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var room = document.querySelector('#housing-rooms');
  var guest = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('.map__features input');
  var filterSelects = [].slice.call(document.querySelectorAll('.map__filters select'));
  var filterCheckboxes = [].slice.call(document.querySelectorAll('.map__filters input[type=checkbox]'));
  var lastFilter;

  var getPins = function (data) {
    var pins = data.slice(0);

    switch (type.value) {
      case 'flat':
        pins = pins.filter(function (it) {
          return it.offer.type === 'flat';
        });
        break;
      case 'palace':
        pins = pins.filter(function (it) {
          return it.offer.type === 'palace';
        });
        break;
      case 'house':
        pins = pins.filter(function (it) {
          return it.offer.type === 'house';
        });
        break;
      case 'bungalo':
        pins = pins.filter(function (it) {
          return it.offer.type === 'bungalo';
        });
        break;
    }

    switch (price.value) {
      case 'middle':
        pins = pins.filter(function (it) {
          return it.offer.price <= Price.HIGH && it.offer.price >= Price.LOW;
        });
        break;
      case 'low':
        pins = pins.filter(function (it) {
          return it.offer.price <= Price.LOW;
        });
        break;
      case 'high':
        pins = pins.filter(function (it) {
          return it.offer.price >= Price.HIGH;
        });
        break;
    }

    switch (room.value) {
      case '1':
        pins = pins.filter(function (it) {
          return it.offer.rooms === Capacity.ONE;
        });
        break;
      case '2':
        pins = pins.filter(function (it) {
          return it.offer.rooms === Capacity.TWO;
        });
        break;
      case '3':
        pins = pins.filter(function (it) {
          return it.offer.rooms === Capacity.TREE;
        });
        break;
    }

    switch (guest.value) {
      case '0':
        pins = pins.filter(function (it) {
          return it.offer.guests === Capacity.ZERO;
        });
        break;
      case '1':
        pins = pins.filter(function (it) {
          return it.offer.guests === Capacity.ONE;
        });
        break;
      case '2':
        pins = pins.filter(function (it) {
          return it.offer.guests === Capacity.TWO;
        });
        break;
    }

    for (var i = 0; i < features.length; i++) {
      if (features[i].checked) {
        pins = pins.filter(function (it) {
          return it.offer.features.indexOf(features[i].value) >= 0;
        });
      }
    }

    return pins;
  };

  filter.addEventListener('change', function () {
    if (lastFilter) {
      clearTimeout(lastFilter);
    }
    lastFilter = setTimeout(function () {
      window.pin.update();
    }, DEBOUNCE_TIMEOUT);
  });

  var resetFilters = function () {
    window.utils.resetSelect(filterSelects);
    window.utils.resetCheckbox(filterCheckboxes);
  };

  var filterDisableToggle = function () {
    var filterElements = [].slice.call(document.querySelector('.map__filters').elements);
    filterElements.forEach(function (el) {
      el.disabled = !el.disabled;
    });
  };

  window.filter = {
    getFilterPins: getPins,
    reset: resetFilters,
    elementsToggle: filterDisableToggle
  };
}());
