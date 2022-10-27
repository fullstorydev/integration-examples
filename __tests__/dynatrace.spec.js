import {makeFSReady, setSessionURL} from "../__mocks__/fs";
import '../__mocks__/dynatrace';
import '../src/dynatrace';

describe('Foresee tests', () => {


  setSessionURL( "https://app.fullstory.com/ui/K8ANT/session/5440117730283520%3A5116389792698368" );
  makeFSReady();

  test('Normal Dynatrace call ', () => {
    window._fs_ready();
    expect(dtrum.sendSessionProperties).toHaveBeenLastCalledWith(
      null, null, { "fullStorySession": "https://app.fullstory.com/ui/K8ANT/session/5440117730283520%3A5116389792698368" }
     );
  });

});
