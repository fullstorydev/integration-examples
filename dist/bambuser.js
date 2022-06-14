(function () {
  'use strict';

  function fs(api) {
    if (!hasFs()) {
      return function () {
        console.error('FullStory unavailable, check your snippet or tag');
      };
    } else {
      if (api && !window[window._fs_namespace][api]) {
        return function () {
          console.error(window._fs_namespace + '.' + api + ' unavailable, update your snippet or verify the API call');
        };
      }
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function hasFs() {
    return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
  }

  function handleTrackingEvent(event) {
    var detail = event.detail;
    if (!detail) {
      fs('log')('warn', 'bambuser-liveshop-tracking-point data not found');
      return;
    }
    var payload = detail.data;
    payload.event = detail.event;
    delete payload.items;
    // fs('event')('Bambuser Event', payload);
    console.log('Bambuser Event', payload)
  }
  if (!window['_fs_bambuser_liveshop_registered']) {
    window.addEventListener('bambuser-liveshop-tracking-point', handleTrackingEvent);
    window['_fs_bambuser_liveshop_registered'] = true;
  }

}());
