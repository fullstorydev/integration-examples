import { fs } from './utils/fs';

// a list of keys (e.g. 'a' or 'Tab'); the value should match a keyboard event's `key` property
// keys should significant and pressed infrequently as to prevent rate limiting by FullStory
// window['_fs_integration_keys'] = ['tab']

// convert the keys to lower case to support the user being able to specify 'tab' or 'Tab'
const keys = !window['_fs_integration_keys'] || window['_fs_integration_keys'].length === 0 ? ['tab'] : window['_fs_integration_keys'].map(key => key.toLowerCase());

// a dictionary of key:count pairs
const keyCount = {};

function handleKeydown(event) {
  const { key } = event;
  const lowercaseKey = key.toLowerCase();

  // verify that the key should be recorded as a page var
  if (keys.indexOf(lowercaseKey) > -1) {
    keyCount[lowercaseKey] = keyCount[lowercaseKey] === undefined ? 1 : keyCount[lowercaseKey] + 1;

    // set the page var to key_<key>_count_int (e.g. key_tab_count_int=3)
    const payload = {};
    payload[`key_${lowercaseKey}_count_int`] = keyCount[lowercaseKey];

    // update the page var
    fs('setVars')('page', payload);
  }
}

// if there are no keys of interest, skip registering an event listener
if (keys && keys.length > 0) {
  document.addEventListener('keydown', handleKeydown);
} else {
  fs('log')('_fs_integration_keys is not configured');
}
