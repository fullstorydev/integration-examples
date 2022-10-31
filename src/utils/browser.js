/**
 * Insert a script into the document object.  It will put
 * async=true on the script and will add it to the head
 * @param scriptSrc The src of the script tag
 */
export function insertScriptIntoDocument( scriptSrc ){
  (function (d, script) {
    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = scriptSrc;
    d.getElementsByTagName('head')[0].appendChild(script);
  }(document));
}
