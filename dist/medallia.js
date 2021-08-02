(function () {
  'use strict';

  function fs(api) {
    if (!hasFs()) {
      return function () {
        console.error(`FullStory unavailable, check your snippet or tag`);
      }
    } else {
      if (api && !window[window._fs_namespace][api]) {
        return function () {
          console.error(`${window._fs_namespace}.${api} unavailable, update your snippet or verify the API call`);
        }
      }
      return api ? window[window._fs_namespace][api] : window[window._fs_namespace];
    }
  }
  function hasFs() {
    return window._fs_namespace && typeof window[window._fs_namespace] === 'function';
  }

  function handleSubmitFeedback(event) {
    const detail = event.detail;
    if (!detail) {
      fs('log')('warn', 'MDigital_Submit_Feedback data not found');
      return;
    }
    const payload = {
      Form_Type: detail.Form_Type,
      Form_ID: detail.Form_ID,
      Feedback_UUID: detail.Feedback_UUID,
    };
    for (let i = 0; i < detail.Content.length; i += 1) {
      if (detail.Content[i].unique_name === 'NPS') {
        fs('setUserVars')({ NPS: detail.Content[i].value });
      } else {
        payload[detail.Content[i].unique_name] = detail.Content[i].value;
      }
    }
    fs('event')('Medallia Feedback', payload);
  }
  window.addEventListener('MDigital_Submit_Feedback', handleSubmitFeedback);

}());
