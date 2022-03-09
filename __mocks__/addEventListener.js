// exported values to let tests test against these coming through
export const ADOBE_TARGET_TYPE = 'at-request-succeeded';
export const ADOBE_TARGET_RESPONSE = {
    detail : {
        responseTokens: [
            {
                activityid_str: 438519,
                experienceid_str: 1,
                optionid_str: 3
            }
        ]
    }
}
// event listener function to be able to test in mock tests
export const eventListenerFunction = jest.fn( (type, callbackFn ) => {
    if( callbackFn && type && type === ADOBE_TARGET_TYPE ){
        callbackFn( ADOBE_TARGET_RESPONSE );
    }
});
Object.defineProperty(document, 'addEventListener', {
    value: eventListenerFunction,
});
