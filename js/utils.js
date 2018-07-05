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

    clearNode: function (node) {
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }

      return node;
    }

  };

}());
