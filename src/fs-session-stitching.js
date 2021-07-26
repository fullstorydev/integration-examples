import { fs, waitUntil } from './utils/fs';

/**
 * Demonstrates cross-domain session stitching, which involves delaying recording until a persistent
 * user ID can be passed to `FS.identify`.
 */

/**
 * Get `window._fs_user_identity` for an object containing user vars, identify the user, and resume recording.
 * The object returned must contain `uid` and can optionally contain additional properties per
 * https://help.fullstory.com/hc/en-us/articles/360020623294.
 */
function identify() {
  const userVars = window._fs_user_identity;

  if (!userVars || !userVars.uid) {
    console.error('FS.identify requires user variables to exist and contain uid');
  } else {
    fs('setUserVars')(userVars);
    fs('restart')();
  }
}

// immediately call `FS.shutdown` after loading the snippet
fs('shutdown')();

// wait until a UID is available or timeout and resume recording
waitUntil(function () {
  // check `window._fs_user_identity` for an object containing user vars or a falsy value
  return window._fs_user_identity;
}, identify, 2000, fs('restart'))();