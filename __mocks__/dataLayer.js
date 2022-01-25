/**
 * This is meant to be a mock for interacting with the dataLayer.
 */

// used for GOOGLE OPTIMIZE implementation
export const OPTIMIZE_ID = "123456";
export const VARIANT = "1";

let dataLayer = {};
// implement the push function.  New implementations can be placed in here
dataLayer.push = jest.fn( (newValue) => {
  // we only support the specific optimize.callback push so if it is
  // not that, then just return
  if( !newValue || (newValue.length !== 3) ){
    return;
  }
  let operation = newValue[0];
  let description = newValue[1];
  let object = newValue[2];
  // look for very specific event, optimize.callback, callbackfn() push
  if( operation && (operation === "event") && description && (description === "optimize.callback") && object && (typeof( object.callback ) === "function") ){
    object.callback( VARIANT, OPTIMIZE_ID );
  }
});
Object.defineProperty(window, 'dataLayer', {
  value: dataLayer,
  writable: true
});


