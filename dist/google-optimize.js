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

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    dataLayer.push(arguments);
  };
  window.gtag('event', 'optimize.callback', {
    callback: optimizeCallback
  });
  function optimizeCallback(value, name) {
    fs("event")("Experiment Viewed", {
      experiment_id: name,
      experiment_value: value
    });
  }

}());
