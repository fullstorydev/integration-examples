import { fs, registerFsReady } from './utils/fs';

/**
 * Allows invisible DOM content to be sent as page variables.  For example, the following HTML:
 *
 * <div id="pageinfo" style="display:none">
 *  <site>GCP</site>
 *  <region>east4</region>
 * </div>
 *
 * create FullStory page variables ("site" and "region") for the following configuration:
 *
 * _fs_dom_vars_selector = '#pageinfo';
 * _fs_dom_vars_tags = ['site','region'];
 */

const selector = window['_fs_dom_vars_selector'];
const tagNames = window['_fs_dom_vars_tags'] || [];

/**
 * For a given HTML element that matches a selector, return a dictionary of all child elements
 * tag names and text content.
 * @param selector CSS selector used to uniquely identify the HTML element
 * @param names List of tag names that should be contained in the dictionary
 */
function readVars(selector, names) {
  const payload = {};

  // guard against a possible empty string that results in a DOMException
  const element = selector ? document.querySelector(selector) : undefined;

  if (element) {
    // iterate over all
    for (let i = 0; i < element.children.length; i += 1) {
      const childElement = element.children[i];

      for (let j = 0; j < names.length; j += 1) {
        // normalize tag name and user-provided tag name
        const tagName = childElement.tagName.toLowerCase();
        const allowedTagName = names[j].toLowerCase();

        if (tagName === allowedTagName) {
          payload[tagName] = childElement.textContent;
        }
      }
    }

    // if the dictionary has no content, simply return undefined
    return Object.getOwnPropertyNames(payload).length ? payload : undefined;
  } else {
    return undefined;
  }
}

registerFsReady(() => {
  const pageVars = readVars(selector, tagNames);

  if (pageVars) {
    fs('setVars')('page', pageVars);
  }
});
