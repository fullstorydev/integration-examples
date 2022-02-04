import {fs, registerFsReady} from "./utils/fs";
import {getAvailableCookies} from "./utils/cookie";


/**
 * Utility function to get cookies as a lookup.
 * @param cookieNames An array of cookie names to return as cookieName=value on return object
 */
function getCookiesAsLookup( cookieNames ){
  let cookies = getAvailableCookies();
  let userVars = {};
  for( let i=0; i<cookieNames.length; i++ ){
    if( cookieNames[i] in cookies ){
      userVars[cookieNames[i]] = cookies[cookieNames[i]];
    }
    else {
      fs( "log" )( "warn", "Cookie " + cookieNames[i] + " was not found when trying to get it in a lookup" );
    }
  }
  return userVars;
}

/**
 * Set fs userVars based on cookie names.  Will be set as cookie.name=cookie.value
 * If cookie is not available, it will not be in the userVars, and a warning will be logged to fs(log)
 * Also note that userVars in FullStory cannot start with _ character, so make sure your cookies
 * don't start with that otherwise they won't appear.
 * @param cookieNames An array of cookie names to set as values
 */
function setCookiesAsUserVars( cookieNames ){
  let userVars = getCookiesAsLookup( cookieNames );
  fs( "setUserVars" )( userVars );
}

/**
 * Set fs page Vars based on cookie names.  Will be set as cookie.name=cookie.value
 * If cookie is not available, it will not be in the page Vars, and a warning will be logged to fs(log)
 * @param cookieNames An array of cookie names to set as page values
 */
function setCookiesAsPageVars( cookieNames ){
  let pageVars = getCookiesAsLookup( cookieNames );
  fs( "setVars" )( "page", pageVars );
}

/**
 *
 * set cookie names as user variables depending on window._fs_cookies_setUserVar
 * Please note you must set the window._fs_cookies_setUserVar variable for this to have effect
 * Variable should be an array of cookie names to turn into userVars
 */
registerFsReady( () => {
  if( window._fs_cookies_setUserVar ){
    setCookiesAsUserVars( window._fs_cookies_setUserVar );
  }
  if( window._fs_cookies_setPageVar ){
    setCookiesAsPageVars( window._fs_cookies_setPageVar );
  }
});