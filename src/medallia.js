import { fs } from './utils/fs';

/**
 * Handles the MDigital_Submit_Feedback event:
 * - Attributes NPS score to user using `FS.setUserVars`
 * - Creates a single "Medallia Feedback" custom event with content name value pairs
 * @param event MDigital_Submit_Feedback event
 */
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
      if (window['_fs_medallia_use_label'] && detail.Content[i].label) {
        payload[detail.Content[i].label.trim().replace(/\s/g, '_')] = detail.Content[i].value;
      } else {
        payload[detail.Content[i].unique_name] = detail.Content[i].value;
      }
    }
  }

  fs('event')('Medallia Feedback', payload);
}

/**
 * window['_fs_medallia_use_label'] changes how feedback items are stored in the custom event.
 * The default behavior is _fs_medallia_use_label=false.
 * _fs_medallia_use_label=true stores "How_would_you_rate_our_store":7
 * _fs_medallia_use_label=false stores OSAT_7_Store:7
 */

// window['_fs_medallia_use_label'] = true;

if (!window['_fs_medallia_feedback_registered']) {
  window.addEventListener('MDigital_Submit_Feedback', handleSubmitFeedback);
  window['_fs_medallia_feedback_registered'] = true;
}