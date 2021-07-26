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
      if (predicateFn()) {
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
    const userVars = window._fs_user_identity;
    if (!userVars || !userVars.uid) {
      console.error('FS.identify requires user variables to exist and contain uid');
    } else {
      fs('setUserVars')(userVars);
      fs('restart')();
    }
  }
  fs('shutdown')();
  waitUntil(function () {
    return window._fs_user_identity;
  }, identify, timeout, fs('restart'));

}());
