import { sampleLocalStorage } from './utils/fs';

// sample 10% of users (i.e. 1 out of every 10 users)
const rate = 10;

// re-sample the user after 90 days have elapsed
const days = 90;

if (sampleLocalStorage(rate, days)) {
  console.log('REPLACE THIS ENTIRE LINE AND CONSOLE LOG WITH YOUR FULLSTORY SNIPPET');
}
