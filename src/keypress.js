import { fs } from './utils/fs';

const defaultKeys = ['Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

// a list of keys (e.g. "Tab"); values should match a keyboard event's "key" property
// keys should significant and pressed infrequently as to prevent rate limiting by FullStory
// window['_fs_allowed_keys'] = ['tab'];
const keys = window['_fs_allowed_keys'] || defaultKeys;

/**
 * Creates a "Key Pressed" custom event with the property "key" set to the key pressed by the user.
 * This approach should be used for infrequent, significant key events such as the tab key or arrow keys that support
 * use cases related to page navigation.
 * @param event KeyBoard event
 */
function handleKeyup(event) {
  const { key } = event;

  // verify that the key should be recorded
  if (keys.indexOf(key) > -1) {
    fs('event')('Key Pressed', {
      key,
    });
  }
}

// if there are no keys of interest, skip registering an event listener
if (keys && keys.length > 0) {
  // use keyup since holding down a key will fire multiple events and cause rate limiting
  document.addEventListener('keyup', handleKeyup);
} else {
  fs('log')('_fs_allowed_keys is not configured');
}
