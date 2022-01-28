import '../__mocks__/fs';
import { fs, hasFs, sample, waitUntil, registerFsReady } from '../src/utils/fs';

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
    const numTests = 100 / rate;

    let success = false;

    for (let i = 0; i < numTests; i += 1) {
      for (let j = 0; j < rate; j += 1) {
        // check the random result
        if (sample(rate, 30)) {
          // if it's true, the user is sampled and mark success
          success = true;
        } else {
          // if the user was not sampled, a cookie has been set
          expect(document.cookie).toContain('_fs_sample_user=false');
          // manually clear the cookie that was set in the `sample` function
          // to allow for another random result
          document.cookie = '_fs_sample_user=; path=/';
        }
      }
    }

    // after `numTests` the expectation is that the user *should have* been randomly sampled
    expect(success).toEqual(true);
    expect(document.cookie).toContain('_fs_sample_user=true');
    expect(document.cookie).not.toContain('_fs_sample_user=false');
  });

  test('existing _fs_sample_user cookie value should be re-used', () => {
    const numTests = 100;
    const rate = 10; // 10% sample rate

    const samples = [];

    // manually set to cookie to sample the user
    document.cookie = '_fs_sample_user=true; path=/';

    // run a sufficient number of tests to overcome
    for (let i = 0; i < numTests; i += 1) {
      samples[i] = sample(rate);
    }

    // for every sample result, expect the existing cookie's value to be used
    expect(samples).toContain(true);
    expect(samples).not.toContain(false);

    // do the exact same as the above but for the non-sample scenario
    document.cookie = '_fs_sample_user=false; path=/';

    for (let i = 0; i < numTests; i += 1) {
      samples[i] = sample(rate);
    }

    expect(samples).toContain(false);
    expect(samples).not.toContain(true);
  });

  test('invalid _fs_sample_user cookie re-samples', () => {
    const rate = 10; // 10% sample rate

    // set the existing cookie to something invalid (i.e. anything other than true or false)
    document.cookie = `_fs_sample_user=test; path=/`;

    // this will cause the `sample` function to run and randomly sample
    // and overwrites the invalid cookie
    const shouldSample = sample(rate);
    expect(document.cookie).toEqual(`_fs_sample_user=${shouldSample}`);
  });
});

test('test registerCallback variations', () => {

  // setup some functions we will be testing that they get called
  const fsReadyFirst = jest.fn( () => {
  });
  const fsReadySecond = jest.fn( () => {
  });
  const registerFsFunction = jest.fn( () => {
  });
  const recursiveRegisterFsFunction = jest.fn( () => {
  });

  // add in our first function into the _fs_ready
  window._fs_ready = fsReadyFirst;
  // make sure hasFs will return false
  window._fs_namespace = 'JEST';
  // register a function
  registerFsReady( registerFsFunction );
  // register a second function (should support recursive)
  registerFsReady( recursiveRegisterFsFunction );
  // add in another _fs_ready function (should use proxy)
  window._fs_ready = fsReadySecond;

  // call _fs_ready
  window._fs_ready();

  // make sure all four functions get called
  expect( fsReadyFirst ).toBeCalled();
  expect( fsReadySecond ).toBeCalled();
  expect( registerFsFunction ).toBeCalled();
  expect( recursiveRegisterFsFunction ).toBeCalled();

});
