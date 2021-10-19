(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function fs(api) {
    if (!hasFs()) {
      return function () {
        console.error("FullStory unavailable, check your snippet or tag");
      };
    } else {
      if (api && !window[window._fs_namespace][api]) {
        return function () {
          console.error("".concat(window._fs_namespace, ".").concat(api, " unavailable, update your snippet or verify the API call"));
        };
      }
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function hasFs() {
    return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
  }
  function waitUntil(predicateFn, callbackFn, timeout, timeoutFn) {
    var totalTime = 0;
    var delay = 64;
    var resultFn = function resultFn() {
      if (typeof predicateFn === 'function' && predicateFn()) {
        callbackFn();
        return;
      }
      delay = Math.min(delay * 2, 1024);
      if (totalTime > timeout) {
        if (typeof timeoutFn === 'function') {
          timeoutFn();
        }
      } else {
        totalTime += delay;
        setTimeout(resultFn, delay);
      }
    };
    resultFn();
  }

  var timeout = 2000;
  function identify() {
    if (typeof window._fs_identity === 'function') {
      var userVars = window._fs_identity();
      if (_typeof(userVars) === 'object' && typeof userVars.uid === 'string') {
        fs('setUserVars')(userVars);
        fs('restart')();
      } else {
        fs('log')('error', 'FS.setUserVars requires an object that contains uid');
      }
    } else {
      fs('log')('error', 'window["_fs_identity"] function not found');
    }
  }
  fs('shutdown')();
  waitUntil(window._fs_identity, identify, timeout, fs('restart'));

}());
