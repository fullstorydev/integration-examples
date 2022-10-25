(function () {
  'use strict';

  function sampleCookie() {
    var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var days = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var cookieName = '_fs_sample_user';
    try {
      if (document.cookie.indexOf(cookieName + '=true') > -1 || document.cookie.indexOf(cookieName + '=false') > -1) {
        return document.cookie.indexOf(cookieName + '=true') > -1;
      } else {
        var shouldSample = Math.random() < rate / 100;
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = cookieName + '=' + shouldSample + '; expires=' + date.toGMTString() + '; path=/';
        return shouldSample;
      }
    } catch (err) {
      console.error('FullStory not loaded, unable to sample user');
      return false;
    }
  }

  var rate = 10;
  var days = 90;
  if (sampleCookie(rate, days)) {
    console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
  }

}());
