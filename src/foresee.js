import {fs, registerFsReady} from "./utils/fs";

registerFsReady( () => {
    if( FSR && FSR.CPPS ){
        FSR.CPPS.set( 'fullStorySession', fs( 'getCurrentSessionURL')() );
    }
});