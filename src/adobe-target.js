import {fs, registerFsReady} from "./utils/fs";

document.addEventListener( 'at-request-succeeded',  (event) => {
    if( event && event.detail && event.detail.responseTokens && event.detail.responseTokens.length ){
        registerFsReady( () => {
            for( let i=0; i<event.detail.responseTokens.length; i++ ){
                fs("event")("Experiment Viewed", event.detail.responseTokens[i]);
            }
        });
    }
} );