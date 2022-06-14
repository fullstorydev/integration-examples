import { fs } from './utils/fs';

/**
 * Handles the bambuser-liveshop-tracking-point event:
 * @param event bambuser-liveshop-tracking-point event
 */
function handleTrackingEvent(event) {
  const detail = event.detail;

  if (!detail) {
    fs('log')('warn', 'bambuser-liveshop-tracking-point data not found');
    return;
  }

  const payload = detail.data;
  payload.event = detail.event;
  delete payload.items; // remove product items since this is a list of objects and is not supported by FS.event

  fs('event')('Bambuser Event', payload);
}

if (!window['_fs_bambuser_liveshop_registered']) {
  window.addEventListener('bambuser-liveshop-tracking-point', handleTrackingEvent);
  window['_fs_bambuser_liveshop_registered'] = true;
}