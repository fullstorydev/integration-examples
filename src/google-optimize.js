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

// take the optimize callback and turn it into an FS event
function optimizeCallback( value, name ) {
  fs( "event" )( "Experiment Viewed", {
    experiment_id: name,
    experiment_value: value
  });
}