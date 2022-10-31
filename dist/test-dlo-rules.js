(function () {
  'use strict';

  function insertScriptIntoDocument(scriptSrc) {
    (function (d, script) {
      script = d.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = scriptSrc;
      d.getElementsByTagName('head')[0].appendChild(script);
    })(document);
  }

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
      insertScriptIntoDocument('https://edge.fullstory.com/datalayer/v1/latest.js');
    }
  }

  if (window['_dlo_rules_testing']) {
    registerRules('dlo_rules_testing');
  }

}());
