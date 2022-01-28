/**
 * Iterate a specified number of times, calling a function each time, trying to hit a target rate per second
 * @param targetRatePerSecond The target rate per second being targeted
 * @param numSeconds The total number of seconds to run the scenario
 * @param iterationTimeEstimate Estimate in ms each iteration takes
 * @param iterateFn The function to call for each iteration
 * @param callbackFn Optional callback function for when things are done.  If empty, will just log actual rate achieved
 */
export function iterateWithRate( targetRatePerSecond, numSeconds, iterationTimeEstimate, iterateFn, callbackFn ){
  // (total time - estimated iteration time) / total iterations
  let startingTime = new Date().getTime();
  let totalIterations = targetRatePerSecond * numSeconds;
  let sleepPerIteration = ((1000 * numSeconds) - (totalIterations * iterationTimeEstimate)) / totalIterations;
  function iterationsComplete(){
    let endingTime = new Date().getTime();
    let totalTime = endingTime - startingTime;
    let actualRate = totalIterations / (totalTime/1000);
    console.log( "TotalIterations=" + totalIterations + " sleepPerIteration=" + sleepPerIteration);
    console.log( "Total time=" + totalTime + " actualRate=" + actualRate );
  }
  callbackFn = callbackFn || iterationsComplete;
  _nextIterate( 1, sleepPerIteration, totalIterations, iterateFn, callbackFn );

}
function _nextIterate( iteration, sleepPerIteration, totalIterations, iterateFn, callbackFn ){
  iterateFn( iteration );
  iteration = iteration + 1;
  if( iteration <= totalIterations ) {
    setTimeout(() => { _nextIterate( iteration, sleepPerIteration, totalIterations, iterateFn, callbackFn )}, sleepPerIteration);
  }
  else {
    callbackFn();
  }
}
