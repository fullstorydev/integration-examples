/**
 * Gets the FullStory recording API from the window.
 * @param api An optional API that returns the callable API as a function
 * @returns The FullStory "FS" function or a specific API as a function
 */
export function fs(api) {
  if (!window._fs_namespace) {
    console.error(`FullStory unavailable, window["_fs_namespace"] must be defined`);
    return undefined;
  } else {
    return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
  }
}

/**
 * Tests if the FullStory recording API exists in the window.
 * @returns True if the recording API exists and has the function type
 */
export function hasFs() {
  return typeof fs() === 'function';
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

    totalTime += delay
    setTimeout(resultFn, delay);
  };

  resultFn();
}