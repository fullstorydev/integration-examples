import {makeFSReady} from "../__mocks__/fs";
import "../src/adobe-target";
import {fs} from "../src/utils/fs";

const ADOBE_TARGET_TYPE = 'at-request-succeeded';
const ADOBE_TARGET_RESPONSE = {
        responseTokens: [
            {
                activityid_str: 438519,
                experienceid_str: 1,
                optionid_str: 3
            }
        ]
}

describe('Adobe target', () => {

    test('Delayed calling of fs.event', () => {
        document.dispatchEvent( new CustomEvent( ADOBE_TARGET_TYPE, { detail:  ADOBE_TARGET_RESPONSE  } ) );
        // before fs is ready, listener should still be called
        expect(fs("event")).toBeCalledTimes(0);
        // kick off the fs ready
        makeFSReady();
        window._fs_ready();
        // verify the event came through
        expect(fs("event")).toHaveBeenLastCalledWith("Experiment Viewed", ADOBE_TARGET_RESPONSE.responseTokens[0]);
    } );

});
