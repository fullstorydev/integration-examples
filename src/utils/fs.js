/**
 * Gets the FullStory recording API from the window.
 * @param api An optional API that returns the callable API as a function
 * @returns The FullStory "FS" function or a specific API as a function
 */
export function fs(api) {
  if (!hasFs()) {
    return function () {
      console.error('FullStory unavailable, check your snippet or tag');
    }
  } else {
    // guard against older snippets that may not define an API
    if (api && !window[window._fs_namespace][api]) {
      return function () {
        console.error(window._fs_namespace + '.' + api + ' unavailable, update your snippet or verify the API call');
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
 * Samples a current user. If the user is randomly sampled, a cookie will be set on the user's browser.
 * Subsequent invocations of `sample` will return the previously stored cookie value. Note this approach
 * is subject to being cleared by user cache, vendor cookie limitations, etc.
 * @param rate Whole number between 0 and 100 that indicates the sample rate (e.g. 10%)
 * @param daysValid Number of days until the user is re-sampled; defaults to `30` days
 * @returns true if the user should be sampled
 */
export function sample(rate, daysValid) {
  const cookieName = '_fs_sample_user';

  try {
    // the sample function has successfully run previously
    // NOTE simply checking the cookie name makes testing difficult; hence, check expected key:value pairs
    if (document.cookie.indexOf(cookieName + '=true') > -1 || document.cookie.indexOf(cookieName + '=false') > -1) {
      // sample if and only if the sample flag has been set to true
      return document.cookie.indexOf(cookieName + '=true') > -1;
    } else {
      // decide if the user should be sampled and store the result
      const shouldSample = (Math.random() < (rate / 100));

      // calculate the expiration date of the cookie
      const days = (daysValid !== undefined && daysValid > 0) ? daysValid : 30;
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

      // store the cookie
      document.cookie = cookieName + '=' + shouldSample + '; expires=' + date.toGMTString() + '; path=/';

      return shouldSample;
    }
  } catch (err) {
    console.error('FullStory unavailable, unable to sample user');
    // default to not sampling the user to prevent errors from over-sampling
    return false;
  }
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