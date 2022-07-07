/**
 * This is meant to be a mock for interacting with the dataLayer.
 */

// used for GOOGLE OPTIMIZE implementation
export const OPTIMIZE_ID = "123456";
export const VARIANT = "1";
export const OPTIMIZE_ID2 = "1234567";
export const VARIANT2 = "2";


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
    object.callback( VARIANT, OPTIMIZE_ID2 );
    object.callback( VARIANT, OPTIMIZE_ID );
    // this one should be filtered out
    object.callback( VARIANT, OPTIMIZE_ID );
    object.callback( VARIANT2, OPTIMIZE_ID );
    // as should the following one
    object.callback( VARIANT2, OPTIMIZE_ID );
    // this one depends on wait setting
    setTimeout( () => {
      object.callback( VARIANT2, OPTIMIZE_ID );
    }, 500 );
    // as does this one
    setTimeout( () => {
      object.callback( VARIANT2, OPTIMIZE_ID );
    }, 1100 );
  }
});
Object.defineProperty(window, 'dataLayer', {
  value: dataLayer,
  writable: true
});


