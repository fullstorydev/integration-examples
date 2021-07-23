import '../__mocks__/fs';
import { fs, hasFs } from '../src/utils/fs';

describe('FullStory utilities', () => {
  test('Recording API exists in the window', () => {
    expect(fs()).toBeDefined();
  });

  test('utility function checks that Recording API is available', () => {
    // override the mock's `_fs_namespace` to test the failure case
    window._fs_namespace = 'JEST';
    expect(hasFs()).toBeFalsy();
    // set it back to the mock's default `_fs_namespace`
    window._fs_namespace = 'FS';
    expect(hasFs()).toBeTruthy();
  });

  test('Recording APIs can be called', () => {
    expect(typeof fs('event')).toEqual('function');
    fs('event')('hello', { message: 'world' });
    expect(fs('event')).toHaveBeenCalled();
    expect(fs('event').mock.calls[0][0]).toEqual('hello');
    expect(fs('event').mock.calls[0][1]).toBeDefined();

    expect(typeof fs('identify')).toEqual('function');
    fs('identify')('1234', { displayName: 'FullStory' });
    expect(fs('identify')).toHaveBeenCalled();
    expect(fs('identify').mock.calls[0][0]).toEqual('1234');

    expect(typeof fs('setVars')).toEqual('function');
    fs('setVars')({ pageName: 'Homepage' });
    expect(fs('setVars')).toHaveBeenCalled();
    expect(fs('setVars').mock.calls[0][0]).toBeDefined();

    expect(typeof fs('setUserVars')).toEqual('function');
    fs('setUserVars')({ displayName: 'FullStory' });
    expect(fs('setUserVars')).toHaveBeenCalled();
    expect(fs('setUserVars').mock.calls[0][0]).toBeDefined();
  });
});