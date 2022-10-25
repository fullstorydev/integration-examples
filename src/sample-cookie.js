import { sampleCookie } from './utils/fs';

// sample 10% of users (i.e. 1 out of every 10 users)
const rate = 10;

// re-sample the user after 90 days have elapsed (i.e. cookie expiration)
const days = 90;

if (sampleCookie(rate, days)) {
  console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
}
