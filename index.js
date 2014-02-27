(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([],factory);
    } else {
        root.element_value = factory();
    }
}(this, function () {

  /************************************************/
  // element_value. based on https://github.com/component/value/blob/master/index.js
  /************************************************/
  return function element_value(el, val){
    if (2 == arguments.length) return set(el, val);
    return get(el);
  };

  /**
   * Get `el`'s value.
   */

  function get(el) {
    switch (type(el)) {
      case 'checkbox':
      case 'radio':
        if (el.checked) {
          var attr = el.getAttribute('value');
          return null == attr ? true : attr;
        } else {
          return false;
        }
      case 'radiogroup':
        for (var i = 0, radio; radio = el[i]; i++) {
          if (radio.checked) return radio.value;
        }
        break;
      case 'select':
        for (var i = 0, option; option = el.options[i]; i++) {
          if (option.selected) return option.value;
        }
        break;
      default:
        return el.value;
    }
  }

  /**
   * Set `el`'s value.
   */

  function set(el, val) {
    switch (type(el)) {
      case 'checkbox':
      case 'radio':
        if (val) {
          el.checked = true;
        } else {
          el.checked = false;
        }
        break;
      case 'radiogroup':
        for (var i = 0, radio; radio = el[i]; i++) {
          radio.checked = radio.value === val;
        }
        break;
      case 'select':
        for (var i = 0, option; option = el.options[i]; i++) {
          option.selected = option.value === val;
        }
        break;
      default:
        el.value = val;
    }
  }

  /**
   * Element type.
   */

  function type(el) {
    var group = 'array' == typeOf(el) || 'object' == typeOf(el);
    if (group) el = el[0];
    var name = el.nodeName.toLowerCase();
    var type = el.getAttribute('type');

    if (group && type && 'radio' == type.toLowerCase()) return 'radiogroup';
    if ('input' == name && type && 'checkbox' == type.toLowerCase()) return 'checkbox';
    if ('input' == name && type && 'radio' == type.toLowerCase()) return 'radio';
    if ('select' == name) return 'select';
    return name;
  }

  /************************************************/
  // type. based off https://github.com/component/type/blob/master/index.js
  /************************************************/



  /**
   * Return the type of `val`.
   *
   * @param {Mixed} val
   * @return {String}
   * @api public
   */

  function typeOf(val){
    var toString = Object.prototype.toString;
    switch (toString.call(val)) {
      case '[object Date]': return 'date';
      case '[object RegExp]': return 'regexp';
      case '[object Arguments]': return 'arguments';
      case '[object Array]': return 'array';
      case '[object Error]': return 'error';
    }

    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (val !== val) return 'nan';
    if (val && val.nodeType === 1) return 'element';

    return typeof val.valueOf();
  };


}));