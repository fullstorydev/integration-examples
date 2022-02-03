import {registerFsReady} from "./utils/fs";
import {setCookiesAsUserVars} from "./utils/cookie";

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
});