(function () {
  'use strict';

  function fs(api) {
    if (!window._fs_namespace) {
      console.error(`FullStory unavailable, window["_fs_namespace"] must be defined`);
      return undefined;
    } else {
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function waitUntil(predicateFn, callbackFn, timeout, timeoutFn) {
    let totalTime = 0;
    let delay = 64;
    const resultFn = function () {
      if (typeof predicateFn === 'function' && predicateFn()) {
        callbackFn();
        return;
      }
      delay = Math.min(delay * 2, 1024);
      if (totalTime > timeout) {
        if (timeoutFn) {
          timeoutFn();
        }
      }
      totalTime += delay;
      setTimeout(resultFn, delay);
    };
    resultFn();
  }

  const timeout = 2000;
  function identify() {
    if (typeof window._fs_identity === 'function') {
      const userVars = window._fs_identity();
      if (typeof userVars === 'object' && typeof userVars.uid === 'string') {
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
