import {insertScriptIntoDocument} from "./browser";

/**
 * Register dlo rules based on a window expando variable name.  If DLO is
 * already on the page, registerRule will be called.  Otherwise, DLO
 * will be dynamically loaded
 * @param ruleExpando The window expando property to use for the rules
 */
export function registerRules( ruleExpando ){
  // see if DLO is already on the page
  if (window['_dlo_observer']) {
    // make sure to put it in preview mode
    window['_dlo_observer'].config.previewMode = true;
    // register the rules
    window[ruleExpando].forEach(function (rule) {
      window['_dlo_observer'].registerRule(rule);
    });
  }
  else {
    // if it wasn't there, then setup variables and load the DLO script
    window['_dlo_appender'] = 'console';
    window['_dlo_beforeDestination'] = [{ name: 'convert', enumerate: true, index: -1 }, { name: 'suffix' }, { name: 'insert', value: 'dlo', position: -1 }];
    window['_dlo_previewMode'] = true;
    window['_dlo_readOnLoad'] = true;
    window['_dlo_validateRules'] = true;
    window['_dlo_logLevel'] = 1;
    insertScriptIntoDocument('https://edge.fullstory.com/datalayer/v1/latest.js');
  }
}
