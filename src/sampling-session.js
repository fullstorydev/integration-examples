//The following snippet implements a session based sampling approach utilizing browser cookies to see the entire session of an individual.
//This is NOT the preferred method of sampling. The sampling-cookies.js, user based sampling, should be used unless directed otherwise.
//The user based  approach is used so the customer can measure goals and establish patterns in user behavior over time, such as retention over daysValid.
//Each implementation of this snippet will be unique, updating lines 31 and 28.

(function () {
  'use strict';

  function sample(rate, currentSessionURL) {
    var sessionKey = '_fs_sample_session';
    try {
      var previousSessionURL = localStorage.getItem(sessionKey);
      var previousShouldSample = JSON.parse(localStorage.getItem(sessionKey + '_shouldSample'));
      if (previousSessionURL && previousShouldSample != null && previousSessionURL === currentSessionURL) {
        return previousShouldSample;
      } else {
        var shouldSample = Math.random() < rate / 100;
        localStorage.setItem(sessionKey, currentSessionURL);
        localStorage.setItem(sessionKey + '_shouldSample', shouldSample);
        return shouldSample;
      }
    } catch (err) {
      console.error('FullStory unavailable, unable to sample session');
      return false;
    }
  }

  var rate = 10;
  var currentSessionURL = FS.getCurrentSessionURL();
  if (sample(rate, currentSessionURL)) {
    console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
  }
  
}());
