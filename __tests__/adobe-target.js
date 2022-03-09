import {makeFSReady} from "../__mocks__/fs";
import "../__mocks__/addEventListener";
import "../src/adobe-target";
import {fs} from "../src/utils/fs";
import {ADOBE_TARGET_RESPONSE, ADOBE_TARGET_TYPE, eventListenerFunction} from "../__mocks__/addEventListener";

describe('Adobe target', () => {

    test('Basic function', () => {
        // before fs is ready, listener should still be called
        expect(fs("event")).toBeCalledTimes(0);
        expect(eventListenerFunction).toBeCalledTimes(1);
        expect(eventListenerFunction.mock.calls[0][0]).toEqual(ADOBE_TARGET_TYPE);
        // kick off the fs ready
        makeFSReady();
        window._fs_ready();
        // verify the event came through
        expect(fs("event")).toHaveBeenLastCalledWith("Experiment Viewed", ADOBE_TARGET_RESPONSE.detail.responseTokens[0]);
    } );

});
