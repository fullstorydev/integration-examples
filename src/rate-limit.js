import {registerFsReady} from "./utils/fs";
import {iterateWithRate} from "./utils/rate";

registerFsReady( () => {
  let targetRatePerSecond = 10;
  let numSeconds = 5;
  let iterationTimeEstimate = 1;
  iterateWithRate( targetRatePerSecond, numSeconds, iterationTimeEstimate, (iteration) => {
    // Put your code here
    console.log( "Iteration " + iteration );
  });
});
