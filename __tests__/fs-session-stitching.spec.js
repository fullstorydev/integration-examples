import '../__mocks__/fs';
import '../__mocks__/_fs_identity';
import { fs } from '../src/utils/fs';
import '../src/fs-session-stitching'; // NOTE the script will execute and begin its timeout timer here

describe('FullStory session stitching', () => {
  test('recording is delayed until identity is known', (done) => {
    expect(fs('shutdown')).toBeCalled();
    expect(fs('setUserVars')).toBeCalledTimes(0);
    expect(fs('restart')).toBeCalledTimes(0);

    // simulate an async function that provides user identity
    setTimeout(() => {
      window.s = {
        marketingCloudVisitorID: 'fuLlSt0ry',
        eVar1: 'FullStory',
      };
    }, 100);

    // wait a longer period of time to check the calls to FS
    setTimeout(() => {
      expect(window._fs_identity).toBeDefined();
      expect(window.s).toBeDefined();
      expect(fs('log')).toBeCalledTimes(0); // no FS.log() error messages should exist
      expect(fs('shutdown')).toBeCalledTimes(1);
      expect(fs('setUserVars')).toBeCalledTimes(1);
      expect(fs('setUserVars').mock.calls[0][0].uid).toEqual('fuLlSt0ry');
      expect(fs('setUserVars').mock.calls[0][0].displayName).toEqual('FullStory');
      expect(fs('restart')).toBeCalledTimes(1);

      done();
    }, 2000);
  });
});