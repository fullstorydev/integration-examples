(function (exports) {
  'use strict';

  function registerRules(ruleExpando) {
    if (window['_dlo_observer']) {
      window['_dlo_observer'].config.previewMode = true;
      window[ruleExpando].forEach(function (rule) {
        window['_dlo_observer'].registerRule(rule);
      });
    } else {
      window['_dlo_appender'] = 'console';
      window['_dlo_beforeDestination'] = [{
        name: 'convert',
        enumerate: true,
        index: -1
      }, {
        name: 'suffix'
      }, {
        name: 'insert',
        value: 'dlo',
        position: -1
      }];
      window['_dlo_previewMode'] = true;
      window['_dlo_readOnLoad'] = true;
      window['_dlo_validateRules'] = true;
      window['_dlo_logLevel'] = 1;
      (function (d, script) {
        script = d.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://edge.fullstory.com/datalayer/v1/latest.js';
        d.getElementsByTagName('head')[0].appendChild(script);
      })(document);
    }
  }
  if (window['_dlo_test_rules']) {
    registerRules('dlo_test_rules');
  }

  exports.registerRules = registerRules;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
