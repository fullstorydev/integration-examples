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

  var defaultKeys = ['Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
  var keys = window['_fs_allowed_keys'] || defaultKeys;
  function handleKeyup(event) {
    var key = event.key;
    if (keys.indexOf(key) > -1) {
      fs('event')('Key Pressed', {
        key: key
      });
    }
  }
  if (keys && keys.length > 0) {
    document.addEventListener('keyup', handleKeyup);
  } else {
    fs('log')('_fs_allowed_keys is not configured');
  }

}());
