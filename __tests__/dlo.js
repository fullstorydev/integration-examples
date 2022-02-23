import {registerRules} from "../src/dlo";

describe('DLO', () => {
  window['_dlo_rules_testing' ] = [
    {
      "id": "fs-event-adobe-pageID",
      "source": "s[(prop1,prop5,prop6,prop33)]",
      "destination": "fakeOutput"
    }
  ];
  registerRules( '_dlo_rules_testing' );

  test('make sure script gets loaded', () => {
    expect( window['_dlo_previewMode'] ).toEqual( true );
    expect( window['_dlo_readOnLoad'] ).toEqual( true );
    expect( window['_dlo_validateRules'] ).toEqual( true );
    expect( window['_dlo_logLevel'] ).toEqual( 1 );
  });

  test('make sure register rule gets called', () => {
    window['_dlo_observer'] = {};
    window['_dlo_observer'] = {};
    window['_dlo_observer'].registerRule = jest.fn();
    registerRules( '_dlo_rules_testing' );
    expect( window['_dlo_observer'].registerRule).toHaveBeenLastCalledWith(window['_dlo_rules_testing'][0] );
    expect( window['_dlo_observer'].registerRule).toBeCalledTimes(1 );
  });

});
