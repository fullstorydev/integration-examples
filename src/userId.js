import {fs, registerFsReady} from "./utils/fs";

registerFsReady( () => {
    let cookieID = window.localStorage.getItem('_fs_uid');
    if( cookieID ){
        let	cookieArray = cookieID.split("#");
        let	cookieUserAndSession = cookieArray[2].split(":");
        fs( 'setUserVars' )({
            "FS-UID": cookieUserAndSession[0],
            "FS-SessionID": cookieUserAndSession[1]
        });
    }
});