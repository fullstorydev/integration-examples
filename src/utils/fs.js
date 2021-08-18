/**
 * Gets the FullStory recording API from the window.
 * @param api An optional API that returns the callable API as a function
 * @returns The FullStory "FS" function or a specific API as a function
 */
export function fs(api) {
  if (!hasFs()) {
    return function () {
      console.error(`FullStory unavailable, check your snippet or tag`);
    }
  } else {
    // guard against older snippets that may not define an API
    if (api && !window[window._fs_namespace][api]) {
      return function () {
        console.error(`${window._fs_namespace}.${api} unavailable, update your snippet or verify the API call`);
      }
    }
    return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
  }
}

/**
 * Tests if the FullStory recording API exists in the window.
 * @returns True if the recording API exists and has the function type
 */
export function hasFs() {
  return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
}

/**
 * Waits until a `predicateFn` returns truthy and executes a `callbackFn`.
 * This function will exponentially backoff and wait up to 1024ms until `timeout` is reached.
 * @param predicateFn Tests if the `callbackFn` should run
 * @param callbackFn Callback function to execute when the `predicateFn` is truthy
 * @param timeout Number of milliseconds to wait before giving up
 * @param timeoutFn Optional function executed when the timeout is reached
 */
export function waitUntil(predicateFn, callbackFn, timeout, timeoutFn) {
  let totalTime = 0;
  let delay = 64;
  const resultFn = function () {
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
      totalTime += delay
      setTimeout(resultFn, delay);
    }
  };

  resultFn();
}