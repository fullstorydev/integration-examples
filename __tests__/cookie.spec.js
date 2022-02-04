import {makeFSReady} from "../__mocks__/fs";
import '../__mocks__/cookie.js';
import {getAvailableCookies} from "../src/utils/cookie";
import {fs} from '../src/utils/fs';
import '../src/set-cookies';

describe('Cookie utilities', () => {

  makeFSReady();

  test('Basic getAvailableCookies test', () => {
    // test two cookies coming back
    document.cookie = 'testcookie=foo;test2cookie=bar';
    let cookies = getAvailableCookies();
    expect(cookies).toEqual( {
      "testcookie" : "foo",
      "test2cookie" : "bar"
    });
    // test empty cookie string
    document.cookie = '';
    cookies = getAvailableCookies();
    expect(cookies).toEqual( {});
  });

  test( 'Basic setCookiesAsUserVars test', () => {
    // test pulling out one cookie
    document.cookie = 'anotherCookie=foo;additionalCookie=bar';
    window._fs_cookies_setUserVar = ["anotherCookie"];
    window._fs_ready();
    expect(fs( "setUserVars" )).toHaveBeenLastCalledWith( {
      "anotherCookie" : "foo"
    });
    // test pulling out second cookie
    window._fs_cookies_setUserVar = [ "additionalCookie"];
    window._fs_ready();
    expect(fs("setUserVars")).toHaveBeenLastCalledWith( {
      "additionalCookie" : "bar"
    });
    // test pulling out two cookies
    window._fs_cookies_setUserVar = [ "anotherCookie", "additionalCookie"];
    window._fs_ready();
    expect(fs("setUserVars")).toHaveBeenLastCalledWith( {
      "anotherCookie" : "foo",
      "additionalCookie" : "bar"
    });
    // test pulling out missing cookie
    window._fs_cookies_setUserVar = [ "anotherCookie", "additionalCookie", "missingCookie"];
    window._fs_ready();
    expect(fs("setUserVars")).toHaveBeenLastCalledWith( {
      "anotherCookie" : "foo",
      "additionalCookie" : "bar"
    });
    expect(fs("log")).toHaveBeenLastCalledWith('warn', 'Cookie missingCookie was not found when trying to setCookiesAsUserVars call');
  });
});
