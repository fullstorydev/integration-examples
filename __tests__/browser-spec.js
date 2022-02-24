import "../__mocks__/browser"
import {insertScriptIntoDocument} from "../src/utils/browser";

describe('test browser', () => {

  test('make sure script gets inserted', () => {
    insertScriptIntoDocument( "https://www.test.com/testScript.js");
    expect( document.createElement ).toHaveBeenLastCalledWith( 'script');
    expect( document.getElementsByTagName ).toHaveBeenLastCalledWith( 'head');
    expect( document.getElementsByTagName()[0].appendChild ).toHaveBeenLastCalledWith( {
      type: 'text/javascript',
      async: true,
      src: 'https://www.test.com/testScript.js'
    } );
  });
});
