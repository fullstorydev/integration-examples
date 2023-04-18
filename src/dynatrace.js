import {fs, registerFsReady} from "./utils/fs";

registerFsReady( () => {
    if( dtrum ){
        dtrum.sendSessionProperties( null, null, { 'fullStorySession': fs( 'getCurrentSessionURL')() } );
    }
});