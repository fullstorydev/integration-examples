(function () {
  'use strict';

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

  var keys = !window['_fs_integration_keys'] || window['_fs_integration_keys'].length === 0 ? ['tab'] : window['_fs_integration_keys'].map(function (key) {
    return key.toLowerCase();
  });
  var keyCount = {};
  function handleKeydown(event) {
    var key = event.key;
    var lowercaseKey = key.toLowerCase();
    if (keys.indexOf(lowercaseKey) > -1) {
      keyCount[lowercaseKey] = keyCount[lowercaseKey] === undefined ? 1 : keyCount[lowercaseKey] + 1;
      var payload = {};
      payload["key_".concat(lowercaseKey, "_count_int")] = keyCount[lowercaseKey];
      fs('setVars')('page', payload);
    }
  }
  if (keys && keys.length > 0) {
    document.addEventListener('keydown', handleKeydown);
  } else {
    fs('log')('_fs_integration_keys is not configured');
  }

}());
