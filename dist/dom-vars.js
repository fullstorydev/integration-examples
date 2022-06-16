(function () {
  'use strict';

  function fs(api) {
    if (!hasFs()) {
      return function () {
        console.error('FullStory unavailable, check your snippet or tag');
      };
    } else {
      if (api && !window[window._fs_namespace][api]) {
        return function () {
          console.error(window._fs_namespace + '.' + api + ' unavailable, update your snippet or verify the API call');
        };
      }
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function hasFs() {
    return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
  }
  function isFsReady() {
    return hasFs() && typeof window[window._fs_namespace].getCurrentSessionURL === 'function';
  }
  var _fsReadyFunctions = [];
  function proxiedFsReady() {
    for (var x = 0; x < _fsReadyFunctions.length; x++) {
      try {
        _fsReadyFunctions[x]();
      } catch (error) {
        console.warn("Proxied _fs_ready function threw error", error);
      }
    }
  }
  function registerFsReady(callbackFn) {
    if (isFsReady()) {
      callbackFn();
      return;
    }
    if (window._fs_ready && !(window._fs_ready === proxiedFsReady)) {
      _fsReadyFunctions.push(window._fs_ready);
    }
    _fsReadyFunctions.push(callbackFn);
    Object.defineProperty(window, "_fs_ready", {
      get: function get() {
        return proxiedFsReady;
      },
      set: function set(someFunction) {
        _fsReadyFunctions.push(someFunction);
      }
    });
  }

  var selector = window['_fs_dom_vars_selector'];
  var tagNames = window['_fs_dom_vars_tags'] || [];
  function readVars(selector, names) {
    var payload = {};
    var element = selector ? document.querySelector(selector) : undefined;
    if (element) {
      for (var i = 0; i < element.children.length; i += 1) {
        var childElement = element.children[i];
        for (var j = 0; j < names.length; j += 1) {
          var tagName = childElement.tagName.toLowerCase();
          var allowedTagName = names[j].toLowerCase();
          if (tagName === allowedTagName) {
            payload[tagName] = childElement.textContent;
          }
        }
      }
      return Object.getOwnPropertyNames(payload).length ? payload : undefined;
    } else {
      return undefined;
    }
  }
  registerFsReady(function () {
    var pageVars = readVars(selector, tagNames);
    if (pageVars) {
      fs('setVars')('page', pageVars);
    }
  });

}());
