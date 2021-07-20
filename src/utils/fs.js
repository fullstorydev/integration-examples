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