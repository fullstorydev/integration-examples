import '../__mocks__/fs';
import {OPTIMIZE_ID, VARIANT} from "../__mocks__/dataLayer";
import { fs } from '../src/utils/fs';
import '../src/google-optimize';

describe('Google Optimize', () => {
  test('send FS.event from dataLayer callback', () => {
    // manually trigger feedback submission
    expect(fs('event')).toBeCalled();
    expect(fs('event').mock.calls[0][0]).toEqual('Experiment Viewed');
    expect(fs('event').mock.calls[0][1]).toEqual({
      experiment_id: OPTIMIZE_ID,
      experiment_value: VARIANT
    });
  });
});
