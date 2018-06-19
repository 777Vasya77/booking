'use strict';

(function () {

  window.utils = {
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
