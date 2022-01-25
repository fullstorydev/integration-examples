import '../__mocks__/fs';
import { fs } from '../src/utils/fs';
import '../src/keypress';

// NOTE by default the integration listens for tab key events

describe('Keydown Page Vars', () => {
  test('record a keydown event as a page var', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

    expect(fs('setVars')).toBeCalled();
    expect(fs('setVars').mock.calls[0][0]).toEqual('page');
    expect(fs('setVars').mock.calls[0][1]).toEqual({ key_tab_count_int: 1 });
  });

  test('ignored keys are not recorded as page vars', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));

    expect(fs('setVars')).toBeCalledTimes(1);
  });

  test('subsequent keydown events increment the page var', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

    expect(fs('setVars')).toBeCalledTimes(2);

    expect(fs('setVars').mock.calls[1][0]).toEqual('page');
    expect(fs('setVars').mock.calls[1][1]).toEqual({ key_tab_count_int: 2 });
  });
});