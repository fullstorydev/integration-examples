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
    },
    {
      id: 422870,
      type: 'grading1to10',
      label: 'How would you rate your store visit?',
      unique_name: 'OSAT_7_Store',
      value: 5
    },
    {
      id: 422871,
      type: 'text',
      unique_name: 'Name',
      value: 'User Name'
    },
    {
      id: 422872,
      type: 'text',
      unique_name: 'Email',
      value: 5
    }
  ],
};

describe('Medallia Feedback', () => {
  test('send feedback to FS.event and FS.setUserVars using unique_name', () => {
    // test sending the data as the default behavior (i.e. unique_name)
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
      OSAT_7_Store: 5,
    });

    // test sending the data by setting _fs_medallia_use_label false (i.e. unique_name)
    window['_fs_medallia_use_label'] = false;

    // manually trigger feedback submission
    window.KAMPYLE_SDK.kampyleSubmit(MDigital_Submit_Feedback);

    expect(fs('setUserVars')).toBeCalled();
    expect(fs('setUserVars').mock.calls[0][0]).toEqual({ NPS: 9 });

    expect(fs('event')).toBeCalled();
    expect(fs('event').mock.calls[1][0]).toEqual('Medallia Feedback');
    expect(fs('event').mock.calls[1][1]).toEqual({
      Form_ID: '25266',
      Form_Type: 'Intercept',
      Feedback_UUID: '1053-d865-ee90-1c9a-f81c-6965-c8ab-6b7d',
      Driver1_NPS: 6,
      OSAT_7_DIY_Home: 7,
      OSAT_7_Store: 5,
      // NOTE that "Name" and "Email" unique names are removed by default
    });
  });

  test('send feedback to FS.event and FS.setUserVars using label', () => {
    // test sending the data by setting _fs_medallia_use_label true (i.e. label)
    window['_fs_medallia_use_label'] = true;

    // manually trigger feedback submission
    window.KAMPYLE_SDK.kampyleSubmit(MDigital_Submit_Feedback);

    expect(fs('setUserVars')).toBeCalled();
    expect(fs('setUserVars').mock.calls[0][0]).toEqual({ NPS: 9 });

    expect(fs('event')).toBeCalled();
    expect(fs('event').mock.calls[2][0]).toEqual('Medallia Feedback');
    expect(fs('event').mock.calls[2][1]).toEqual({
      Form_ID: '25266',
      Form_Type: 'Intercept',
      Feedback_UUID: '1053-d865-ee90-1c9a-f81c-6965-c8ab-6b7d',
      Driver1_NPS: 6,
      OSAT_7_DIY_Home: 7, // NOTE there is no label so fall back to unique_name
      'How_would_you_rate_your_store_visit?': 5, // NOTE FullStory will remove the ? char
    });
  });
});