(function () {
  'use strict';

  function sampleLocalStorage() {
    var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var days = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    var key = '_fs_sample_user';
    try {
      var now = new Date();
      var value = JSON.parse(localStorage.getItem(key));
      if (value !== null && now.getTime() <= value.expires) {
        return value.sample;
      } else {
        var shouldSample = Math.random() < rate / 100;
        localStorage.setItem(key, JSON.stringify({
          sample: shouldSample,
          expires: now.getTime() + days * 24 * 60 * 60 * 1000
        }));
        return shouldSample;
      }
    } catch (err) {
      console.error('FullStory not loaded, unable to sample user');
      return false;
    }
  }

  var rate = 10;
  var days = 90;
  if (sampleLocalStorage(rate, days)) {
    console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
  }

}());
