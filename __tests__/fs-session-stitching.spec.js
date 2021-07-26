import '../__mocks__/fs';
import { fs } from '../src/utils/fs';
import '../src/fs-session-stitching';

describe('FullStory session stitching', () => {
  test('recording is delayed until identity is known', (done) => {
    expect(fs('shutdown')).toBeCalled();
    expect(fs('setUserVars')).toBeCalledTimes(0);
    expect(fs('restart')).toBeCalledTimes(0);

    // simulate an async function that determines user identity
    setTimeout(() => {
      window._fs_user_identity = {
        uid: `${Date.now()}`,
      }
    }, 100);

    // wait a longer period of time to check the calls to FS
    setTimeout(() => {
      expect(fs('shutdown')).toBeCalledTimes(1);
      expect(fs('setUserVars')).toBeCalledTimes(1);
      expect(fs('restart')).toBeCalledTimes(1);

      done();
    }, 2000);
  });
});