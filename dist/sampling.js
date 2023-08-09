//The following snippet implements a user based sampling approach utilizing browser cookies (sample users at X percent).
//We assume a "user" will visit the site from the same browser without clearing cookies and if the site is visited from the same browser the "user" will always be the same.
//This approach is used so the customer can measure goals and establish patterns in user behavior over time, such as retention over daysValid.
//The following equation can help a client determine the appropriate values of rate & daysValid.
//rate (%) = (AllottedSessionsForOrg / (NumberOfTotalUniqueUsers * AvgSessionsPerDayPerUser * daysValid)) * 100
//Each implementation of this snippet will be unique, updating line 33, 31, and 30.

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
