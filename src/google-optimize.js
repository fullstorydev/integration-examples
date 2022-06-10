import { fs, registerFsReady } from './utils/fs';

// make sure dataLayer is available
window.dataLayer = window.dataLayer || [];

// make sure gtag function is available
window.gtag = window.gtag || function() {
  dataLayer.push(arguments);
};

registerFsReady(
  () => {
    window.gtag('event', 'optimize.callback', {
      callback: optimizeCallback
    })
  });

let lastExperimentID = undefined;
let lastExperimentValue = undefined;
let lastExperimentFired = undefined;

// take the optimize callback and turn it into an FS event
function optimizeCallback( value, id ) {
  // "Experiment Viewed" was selected as of the time of this addition, it allows for a higher
  // rate limit on calls.  Instead of 10/second 30/minute default, it allows 40/second 60/minut
  let now = Date.now();
  if( (lastExperimentID === id) && (lastExperimentValue === value) ){
    if( lastExperimentFired && (now - lastExperimentFired < 1000) ){
      return;
    }
  }
  lastExperimentFired = now;
  lastExperimentID = id;
  lastExperimentValue = value;
  fs( "event" )( "Experiment Viewed", {
    experiment_id: id,
    experiment_value: value
  });
}