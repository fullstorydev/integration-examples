import {makeFSReady} from "../__mocks__/fs";
import '../__mocks__/localStorage.js';
import {fs} from '../src/utils/fs';
import '../src/userId';

describe('UserId', () => {


  makeFSReady();

  test('No userId example', () => {
    window._fs_ready();
    expect(fs( "setUserVars" )).toBeCalledTimes( 0 );
  });

  test('Basic userId example', () => {
    // test two cookies coming back
    window.localStorage.setItem( '_fs_uid', '#K8ANT#5440117730283520:4992421911875584:::#96bb7273#/16815827490');
    window._fs_ready();
    expect(fs( "setUserVars" )).toHaveBeenLastCalledWith( {
      "FS-UID" : "5440117730283520",
      "FS-SessionID" : "4992421911875584"
    });
  });

});
