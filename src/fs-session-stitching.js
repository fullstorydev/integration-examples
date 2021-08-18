import { fs, waitUntil } from './utils/fs';

/**
 * Demonstrates cross-domain session stitching, which involves delaying recording until `window._fs_user_identity`
 * returns an object that contains `uid` or `timeout` is reached. This code must immediately execute after loading
 * the FullStory snippet.
 */

const timeout = 2000; // NOTE recording may be delayed until timeout is reached

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

// immediately calls `FS.shutdown` after loading the snippet to prevent call to rec/page
fs('shutdown')();

// wait until a UID is available or timeout and resume recording
waitUntil(window._fs_identity, identify, timeout, fs('restart'));