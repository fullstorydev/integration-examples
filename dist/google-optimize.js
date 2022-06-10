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

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    dataLayer.push(arguments);
  };
  registerFsReady(function () {
    window.gtag('event', 'optimize.callback', {
      callback: optimizeCallback
    });
  });
  var lastExperimentID = undefined;
  var lastExperimentValue = undefined;
  var lastExperimentFired = undefined;
  function optimizeCallback(value, id) {
    var testThrottleValue = parseInt(window['_fs_google_optimize_throttle']);
    var throttleValue = Number.isNaN(testThrottleValue) ? 1000 : testThrottleValue;
    var now = Date.now();
    if (lastExperimentID === id && lastExperimentValue === value) {
      if (lastExperimentFired && now - lastExperimentFired < throttleValue) {
        return;
      }
    }
    lastExperimentFired = now;
    lastExperimentID = id;
    lastExperimentValue = value;
    fs("event")("Experiment Viewed", {
      experiment_id: id,
      experiment_value: value
    });
  }

}());
