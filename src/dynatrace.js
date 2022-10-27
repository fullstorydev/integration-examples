import {fs, registerFsReady} from "./utils/fs";

registerFsReady( () => {
    dtrum.sendSessionProperties( null, null, { 'fullStorySession': fs( 'getCurrentSessionURL')() } );
});