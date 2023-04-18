import {makeFSReady, setSessionURL} from "../__mocks__/fs";
import '../__mocks__/foresee';
import '../src/foresee';

describe('Foresee tests', () => {


  setSessionURL( "https://app.fullstory.com/ui/K8ANT/session/5440117730283520%3A5116389792698368" );
  makeFSReady();

  test('Normal FSR call ', () => {
    window._fs_ready();
    expect(FSR.CPPS.set).toHaveBeenLastCalledWith(
      "fullStorySession", "https://app.fullstory.com/ui/K8ANT/session/5440117730283520%3A5116389792698368"
     );
  });

});
