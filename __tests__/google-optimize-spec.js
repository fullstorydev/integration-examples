import '../__mocks__/fs';
import {OPTIMIZE_ID, OPTIMIZE_ID2, VARIANT, VARIANT2} from "../__mocks__/dataLayer";
import { fs } from '../src/utils/fs';
import '../src/google-optimize';
import {makeFSReady} from "../__mocks__/fs";

describe('Google Optimize', () => {
  test('send FS.event from dataLayer callback', (done) => {
    makeFSReady();
    window._fs_ready();
    testOptimizeWithWait( () => {
      expect(fs('event')).toBeCalledTimes(5);
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
      expect(fs('event').mock.calls[3][0]).toEqual('Experiment Viewed');
      expect(fs('event').mock.calls[3][1]).toEqual({
        experiment_id: OPTIMIZE_ID,
        experiment_value: VARIANT2
      });
      done();
    });
  });

  test('send FS.event from dataLayer callback', (done) => {
    window['_fs_google_optimize_throttle' ] = 300;
    window._fs_ready();
    testOptimizeWithWait( () => {
      // please note this will be the times above plus the times this test should run
      expect(fs('event')).toBeCalledTimes(11);
      done();
    });
  });


  // dataLayer adds up to around 2 seconds
  function testOptimizeWithWait( callbackFn ){
    setTimeout( () => {
      callbackFn();
    }, 2000 );
  }
});
