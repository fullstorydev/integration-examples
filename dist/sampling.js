(function () {
  'use strict';

  function sample(rate, daysValid) {
    const cookieName = '_fs_sample_user';
    try {
      if (document.cookie.indexOf(`${cookieName}=true`) > -1 || document.cookie.indexOf(`${cookieName}=false`) > -1) {
        return document.cookie.indexOf(`${cookieName}=true`) > -1;
      } else {
        const shouldSample = (Math.random() < (rate / 100));
        const days = (daysValid !== undefined && daysValid > 0) ? daysValid : 30;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${cookieName}=${shouldSample}; expires=${date.toGMTString()}; path=/`;
        return shouldSample;
      }
    } catch (err) {
      console.error(`FullStory unavailable, unable to sample user`);
      return false;
    }
  }

  const rate = 10;
  const daysValid = 90;
  if (sample(rate, daysValid)) {
    console.log('REPLACE THIS LINE WITH YOUR FULLSTORY SNIPPET');
  }

}());
