import '../__mocks__/fs';
import '../__mocks__/medallia';
import { fs } from '../src/utils/fs';
import '../src/medallia';

const MDigital_Submit_Feedback = {
  Form_ID: '25266',
  Form_Type: 'Intercept',
  Feedback_UUID: '1053-d865-ee90-1c9a-f81c-6965-c8ab-6b7d',
  Content: [
    {
      id: 421498,
      type: 'nps',
      unique_name: 'NPS',
      value: 9,
    },
    {
      id: 552090,
      type: 'grading1to10',
      unique_name: 'Driver1_NPS',
      value: 6,
    },
    {
      id: 422869,
      type: 'grading1to10',
      unique_name: 'OSAT_7_DIY_Home',
      value: 7
    }
  ],
};

describe('Medallia Feedback', () => {
  test('send feedback to FS.event and FS.setUserVars', () => {
    // manually trigger feedback submission
    window.KAMPYLE_SDK.kampyleSubmit(MDigital_Submit_Feedback);

    expect(fs('setUserVars')).toBeCalled();
    expect(fs('setUserVars').mock.calls[0][0]).toEqual({ NPS: 9 });

    expect(fs('event')).toBeCalled();
    expect(fs('event').mock.calls[0][0]).toEqual('Medallia Feedback');
    expect(fs('event').mock.calls[0][1]).toEqual({
      Form_ID: '25266',
      Form_Type: 'Intercept',
      Feedback_UUID: '1053-d865-ee90-1c9a-f81c-6965-c8ab-6b7d',
      Driver1_NPS: 6,
      OSAT_7_DIY_Home: 7,
    });
  });
});