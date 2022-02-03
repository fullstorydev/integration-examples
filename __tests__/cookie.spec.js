import '../__mocks__/fs.js';
import '../__mocks__/cookie.js';
import {getAvailableCookies, setCookiesAsUserVars} from "../src/utils/cookie";
import {fs} from '../src/utils/fs';

const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

describe('Cookie utilities', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  });

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
    setCookiesAsUserVars( window._fs_cookies_setUserVar );
    expect(fs( "setUserVars" )).toHaveBeenLastCalledWith( {
      "anotherCookie" : "foo"
    });
    // test pulling out second cookie
    window._fs_cookies_setUserVar = [ "additionalCookie"];
    setCookiesAsUserVars( window._fs_cookies_setUserVar );
    expect(fs("setUserVars")).toHaveBeenLastCalledWith( {
      "additionalCookie" : "bar"
    });
    // test pulling out two cookies
    window._fs_cookies_setUserVar = [ "anotherCookie", "additionalCookie"];
    setCookiesAsUserVars( window._fs_cookies_setUserVar );
    expect(fs("setUserVars")).toHaveBeenLastCalledWith( {
      "anotherCookie" : "foo",
      "additionalCookie" : "bar"
    });
    // test pulling out missing cookie
    window._fs_cookies_setUserVar = [ "anotherCookie", "additionalCookie", "missingCookie"];
    setCookiesAsUserVars( window._fs_cookies_setUserVar );
    expect(fs("setUserVars")).toHaveBeenLastCalledWith( {
      "anotherCookie" : "foo",
      "additionalCookie" : "bar"
    });
    expect(console.warn).toHaveBeenLastCalledWith('Cookie missingCookie was not found');
  });
});
