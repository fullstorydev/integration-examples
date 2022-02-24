import {registerRules} from "./utils/dlo";

// automatically load the specific window['_dlo_test_rules'] rules if they are present
if( window['_dlo_rules_testing'] ){
  registerRules( 'dlo_rules_testing' );
}
