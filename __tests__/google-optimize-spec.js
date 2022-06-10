import '../__mocks__/fs';
import {OPTIMIZE_ID, OPTIMIZE_ID2, VARIANT, VARIANT2} from "../__mocks__/dataLayer";
import { fs } from '../src/utils/fs';
import '../src/google-optimize';
import {makeFSReady} from "../__mocks__/fs";

describe('Google Optimize', () => {
  test('send FS.event from dataLayer callback', () => {
    makeFSReady();
    window._fs_ready();
    // manually trigger feedback submission
    expect(fs('event')).toBeCalledTimes(4);
    expect(fs('event').mock.calls[0][0]).toEqual('Experiment Viewed');
    expect(fs('event').mock.calls[0][1]).toEqual({
      experiment_id: OPTIMIZE_ID,
      experiment_value: VARIANT
    });
    expect(fs('event').mock.calls[1][0]).toEqual('Experiment Viewed');
    expect(fs('event').mock.calls[1][1]).toEqual({
      experiment_id: OPTIMIZE_ID2,
      experiment_value: VARIANT
    });
    expect(fs('event').mock.calls[2][0]).toEqual('Experiment Viewed');
    expect(fs('event').mock.calls[2][1]).toEqual({
      experiment_id: OPTIMIZE_ID,
      experiment_value: VARIANT
    });
    expect(fs('event').mock.calls[3][0]).toEqual('Experiment Viewed');
    expect(fs('event').mock.calls[3][1]).toEqual({
      experiment_id: OPTIMIZE_ID,
      experiment_value: VARIANT2
    });
  });
});
