import { fs, registerFsReady} from "./utils/fs";
import {iterateWithRate} from "./utils/rate";

registerFsReady( () => {
  let targetRatePerSecond = 10;
  let numSeconds = 5;
  let iterationTimeEstimate = 1;
  iterateWithRate( targetRatePerSecond, numSeconds, iterationTimeEstimate, (iteration) => {
    // Put your code here, example shown here to send events
    fs( "event" )( "TestRateLimit", {
      iteration: iteration
    } );
    console.log( "Iteration " + iteration );
  });
});

/*
If you are testing FS event rate limits, the following are helpful things to note.
Once you hit the limit, calling FS.identify with a different user ID will give you a new session and allow
you to continue testing.  You can see the rate limit hit in the session URL.  You can use the three
variables to recreate rate limits.  The first rate limit is 10 per second.  Set the target for more
than 10 per second and you should easily hit it.  The second rate limit is 30 per minute.  Even if you
set the rate to less than 10 per second, you may still hit this.  Setting the rate to below 0.5 (I used
0.4) should allow you to not get hit by that limit.
 */