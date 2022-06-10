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
      },
      configurable: true
    });
  }

  function getAvailableCookies() {
    var cookies = {};
    var cookieParts = document.cookie.split(';');
    for (var i = 0; i < cookieParts.length; i++) {
      var cookieSplit = cookieParts[i].split('=');
      if (cookieSplit.length === 2) {
        cookies[cookieSplit[0].trim()] = cookieSplit[1];
      }
    }
    return cookies;
  }

  function getCookiesAsLookup(cookieNames) {
    var cookies = getAvailableCookies();
    var userVars = {};
    for (var i = 0; i < cookieNames.length; i++) {
      if (cookieNames[i] in cookies) {
        userVars[cookieNames[i]] = cookies[cookieNames[i]];
      } else {
        fs("log")("warn", "Cookie " + cookieNames[i] + " was not found when trying to get it in a lookup");
      }
    }
    return userVars;
  }
  function setCookiesAsUserVars(cookieNames) {
    var userVars = getCookiesAsLookup(cookieNames);
    fs("setUserVars")(userVars);
  }
  function setCookiesAsPageVars(cookieNames) {
    var pageVars = getCookiesAsLookup(cookieNames);
    fs("setVars")("page", pageVars);
  }
  function sendCookiesAsEvent(cookieNames) {
    var eventAttributes = getCookiesAsLookup(cookieNames);
    fs("event")("Cookie Event", eventAttributes);
  }
  registerFsReady(function () {
    if (window._fs_cookies_setUserVar) {
      setCookiesAsUserVars(window._fs_cookies_setUserVar);
    }
    if (window._fs_cookies_setPageVar) {
      setCookiesAsPageVars(window._fs_cookies_setPageVar);
    }
    if (window._fs_cookies_event) {
      sendCookiesAsEvent(window._fs_cookies_event);
    }
  });

}());
