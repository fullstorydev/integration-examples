import '../__mocks__/fs';
import '../__mocks__/optimizely';
import '../src/optimizely-page-vars';
import { fs } from '../src/utils/fs';

describe('Optimizely A/B experiments', () => {
  test('send experiments as page vars', () => {
    expect(fs('setVars')).toBeCalled();
    expect(fs('setVars').mock.calls[0][0]).toEqual('page');
    expect(fs('setVars').mock.calls[0][1]).toBeDefined();

    const payload = fs('setVars').mock.calls[0][1];
    expect(payload.optimizely_experiment_names.length).toEqual(2);
    expect(payload.optimizely_experiment_names).toContain('July 4th Banner=Full Screen');
    expect(payload.optimizely_experiment_names).toContain('Summer Sale Banner=Variation #1');
  });
});