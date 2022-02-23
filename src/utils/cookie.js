/**
 * Parse the available cookies from the document.cookie variable
 * @returns {{}} An object with key/value pairs of cookie.name=cookie.value
 */
export function getAvailableCookies() {
  let cookies = {};
  let cookieParts = document.cookie.split(';');
  for( let i=0; i<cookieParts.length; i++ ){
    let cookieSplit = cookieParts[i].split('=');
    if( cookieSplit.length === 2 ){
      cookies[cookieSplit[0].trim()] = cookieSplit[1];
    }
  }
  return cookies;
}
