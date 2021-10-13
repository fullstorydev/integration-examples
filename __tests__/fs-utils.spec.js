import '../__mocks__/fs';
import { fs, hasFs, sample, waitUntil } from '../src/utils/fs';

const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('FullStory utilities', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  });

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

  test('missing FS or APIs log error rather than throw exception', () => {
    // temporarily remove FS
    const FS = window.FS;
    window.FS = undefined;
    fs('setUserVars')({ foo: 'bar' });
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith('FullStory unavailable, check your snippet or tag');

    // add back FS
    window.FS = FS;
    fs('newFeature')({ foo: 'bar' });
    expect(console.error).toBeCalledTimes(2);
    expect(console.error).toHaveBeenLastCalledWith(
      `${window._fs_namespace}.newFeature unavailable, update your snippet or verify the API call`);
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

  test('function can be polled and called', (done) => {
    const timeout = 2000;  // milliseconds

    const callbackFn = () => {
      const end = Date.now();
      expect(end).toBeLessThan(start + timeout);
      done();
    }

    const start = Date.now();
    waitUntil(() => window[start], callbackFn, timeout);
    setTimeout(() => {
      window[start] = true;
    }, 250);
  });

  test('timeout function can be used as a fallback case', (done) => {
    const timeout = 500;  // milliseconds

    const predicateFn = jest.fn();
    const callbackFn = jest.fn();
    const timeoutFn = () => {
      const end = Date.now();
      expect(end).toBeGreaterThanOrEqual(start + timeout);
      expect(predicateFn).toBeCalled();
      expect(callbackFn).toBeCalledTimes(0);
      done();
    }

    const start = Date.now();
    waitUntil(predicateFn, callbackFn, timeout, timeoutFn);
  });

  test('sampling rate can be configured', () => {
    const rate = 10; // 10% sample rate
    const margin = 2.5 * (100 / rate); // give it 2.5x margin of random error to ensure the test concludes

    let i = 0;
    while (i <= margin) {
      if (sample(rate, 30)) {
        break;
      } else {
        expect(document.cookie).toContain('_fs_sample_user=false');
        // manually clear the cookie that was set in the `sample` function
        document.cookie = '_fs_sample_user=; path=/';
        i++;
      }
    }

    expect(i).toBeLessThan(margin);
    expect(document.cookie).toContain('_fs_sample_user=true');
    expect(document.cookie).not.toContain('_fs_sample_user=false');
  });

  test('existing _fs_sample_user cookie value should be re-used', () => {
    const numTests = 100;
    const rate = 10; // 10% sample rate

    const samples = [];

    document.cookie = '_fs_sample_user=true; path=/';

    for (let i = 0; i < numTests; i += 1) {
      samples[i] = sample(rate);
    }

    expect(samples).toContain(true);
    expect(samples).not.toContain(false);

    document.cookie = '_fs_sample_user=false; path=/';

    for (let i = 0; i < numTests; i += 1) {
      samples[i] = sample(rate);
    }

    expect(samples).toContain(false);
    expect(samples).not.toContain(true);
  });

  test('invalid _fs_sample_user cookie re-samples', () => {
    const rate = 10; // 10% sample rate

    document.cookie = `_fs_sample_user=test; path=/`;

    const shouldSample = sample(rate);
    expect(document.cookie).toEqual(`_fs_sample_user=${shouldSample}`);
  });
});