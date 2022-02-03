import { fs } from './fs';

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

/**
 * Set fs userVars based on cookie names.  Will be set as cookie.name=cookie.value
 * If cookie is not available, it will not be in the userVars, and a warning will be printed
 * Also note that userVars in FullStory cannot start with _ character, so make sure your cookies
 * don't start with that otherwise they won't appear.
 * @param cookieNames An array of cookie names to set as values
 */
export function setCookiesAsUserVars( cookieNames ){
  let cookies = getAvailableCookies();
  let userVars = {};
  for( let i=0; i<cookieNames.length; i++ ){
    if( cookieNames[i] in cookies ){
      userVars[cookieNames[i]] = cookies[cookieNames[i]];
    }
    else {
      console.warn( "Cookie " + cookieNames[i] + " was not found" );
    }
  }
  fs( "setUserVars" )( userVars );
}