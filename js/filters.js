'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;
  var PRICES = {
    low: 10000,
    high: 50000
  };
  var CAPACITIES = {
    zero: 0,
    one: 1,
    two: 2,
    tree: 3
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
          return it.offer.price <= PRICES.high && it.offer.price >= PRICES.low;
        });
        break;
      case 'low':
        pins = pins.filter(function (it) {
          return it.offer.price <= PRICES.low;
        });
        break;
      case 'high':
        pins = pins.filter(function (it) {
          return it.offer.price >= PRICES.high;
        });
        break;
    }

    switch (room.value) {
      case '1':
        pins = pins.filter(function (it) {
          return it.offer.rooms === CAPACITIES.one;
        });
        break;
      case '2':
        pins = pins.filter(function (it) {
          return it.offer.rooms === CAPACITIES.two;
        });
        break;
      case '3':
        pins = pins.filter(function (it) {
          return it.offer.rooms === CAPACITIES.tree;
        });
        break;
    }

    switch (guest.value) {
      case '0':
        pins = pins.filter(function (it) {
          return it.offer.guests === CAPACITIES.zero;
        });
        break;
      case '1':
        pins = pins.filter(function (it) {
          return it.offer.guests === CAPACITIES.one;
        });
        break;
      case '2':
        pins = pins.filter(function (it) {
          return it.offer.guests === CAPACITIES.two;
        });
        break;
    }

    features.forEach(function (feature) {
      if (feature.checked) {
        pins = pins.filter(function (it) {
          return it.offer.features.indexOf(feature.value) !== -1;
        });
      }
    });

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

  window.filters = {
    getPins: getPins,
    reset: resetFilters,
    elementsToggle: filterDisableToggle
  };
}());
