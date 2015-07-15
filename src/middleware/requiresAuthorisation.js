import _ from 'lodash';

import NotAuthorised from 'exceptions/notAuthorised';

export default function ( req, res, next ) {

    if ( _.get(req.session, 'userId' ) ) {
        next();
    } else {
        next( new NotAuthorised() );
    }

}