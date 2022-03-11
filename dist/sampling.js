(function () {
  'use strict';

  function sample(rate, daysValid) {
    var cookieName = '_fs_sample_user';
    try {
      if (document.cookie.indexOf(cookieName + '=true') > -1 || document.cookie.indexOf(cookieName + '=false') > -1) {
        return document.cookie.indexOf(cookieName + '=true') > -1;
      } else {
        var shouldSample = Math.random() < rate / 100;
        var days = daysValid !== undefined && daysValid > 0 ? daysValid : 30;
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = cookieName + '=' + shouldSample + '; expires=' + date.toGMTString() + '; path=/';
        return shouldSample;
      }
    } catch (err) {
      console.error('FullStory unavailable, unable to sample user');
      return false;
    }
  }

  var rate = 10;
  var daysValid = 90;
  if (sample(rate, daysValid)) {
    console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
  }

}());
