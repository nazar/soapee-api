import morgan from 'morgan';
import fs from 'fs';

import config from 'config';

export default function ( app ) {
    let logger;

    if ( app.get( 'env' ) === 'development' ) {
        logger = morgan( 'dev' );
    } else if ( app.get( 'env' ) === 'production' ) {
        let logfile = fs.createWriteStream( config.logfile, { flags: 'a' } );
        let format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

        logger = morgan( morgan.compile( format ), { stream: logfile } );
    }

    return logger;
}