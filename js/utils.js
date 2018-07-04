'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.utils = {
    isEscKeycode: function (keycode) {
      return (ESC_KEYCODE === keycode);
    },

    isEnterKeycode: function (keycode) {
      return (ENTER_KEYCODE === keycode);
    },

    resetSelect: function (array) {
      array.forEach(function (el) {
        el.selectedIndex = 0;
      });
    },

    resetCheckbox: function (array) {
      array.forEach(function (el) {
        el.checked = false;
      });
    },

    disabledEToggle: function (array) {
      array.forEach(function (el) {
        el.disabled = !el.disabled;
      });
    },

    generateRandomNumber: function (from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    },

    getRandomArrayItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomObjKey: function (obj) {
      var keys = Object.keys(obj);
      return keys[Math.floor(Math.random() * keys.length)];
    },

    clearNode: function (node) {
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }

      return node;
    },

    shuffleArray: function (array) {
      return array.sort(function () {
        return 0.5 - Math.random();
      });
    },

    createRandomLengthArray: function (array) {
      var arrayLength = this.generateRandomNumber(1, array.length);
      return array.slice(0, arrayLength - 1);
    }
  };

}());
