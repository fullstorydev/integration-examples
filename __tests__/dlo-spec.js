import "../__mocks__/dlo"
import "../src/test-dlo-rules";
import {registerRules} from "../src/utils/dlo";

describe('DLO', () => {

  test('make sure script gets loaded', () => {
    expect( window['_dlo_previewMode'] ).toEqual( true );
    expect( window['_dlo_readOnLoad'] ).toEqual( true );
    expect( window['_dlo_validateRules'] ).toEqual( true );
    expect( window['_dlo_logLevel'] ).toEqual( 1 );
  });

  test('make sure register rule gets called', () => {
    window['_dlo_observer'] = {};
    window['_dlo_observer'].config = {};
    window['_dlo_observer'].registerRule = jest.fn();
    registerRules( '_dlo_rules_testing' );
    expect( window['_dlo_observer'].registerRule).toHaveBeenLastCalledWith(window['_dlo_rules_testing'][0] );
    expect( window['_dlo_observer'].registerRule).toBeCalledTimes(1 );
  });

});
