import '../__mocks__/fs';
import { fs } from '../src/utils/fs';
import '../src/keypress';

describe('Keydown Custom Event', () => {
  test('record a keydown custom event', () => {
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));

    expect(fs('event')).toBeCalled();
    expect(fs('event').mock.calls[0][0]).toEqual('Key Pressed');
    expect(fs('event').mock.calls[0][1]).toEqual({ key: 'Tab' });
  });

  test('ignored keys are not recorded', () => {
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift' }));

    expect(fs('event')).toBeCalledTimes(1);
  });

  test('arrow keys and the tab key are recorded by default', () => {
    const defaultKeys = ['Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];

    for (let i = 0; i < defaultKeys.length; i += 1) {
      document.dispatchEvent(new KeyboardEvent('keyup', { key: defaultKeys[i] }));

      expect(fs('event')).toBeCalledTimes(i + 2);
      expect(fs('event').mock.calls[i + 1][0]).toEqual('Key Pressed');
      expect(fs('event').mock.calls[i + 1][1]).toEqual({ key: defaultKeys[i] });
    }
  });
});