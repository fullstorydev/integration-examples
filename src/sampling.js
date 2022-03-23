import { sample } from './utils/fs';

// sample 10% of users (i.e. 1 out of every 10 users)
const rate = 10;

// re-sample the user after 90 days have elapsed (i.e. cookie expiration)
const daysValid = 90;

if (sample(rate, daysValid)) {
  console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
}
