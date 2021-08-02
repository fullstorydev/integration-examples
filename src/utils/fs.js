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