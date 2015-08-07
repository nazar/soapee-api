import _ from 'lodash';

import { User } from 'models/user';
import RecordNotFoundError from 'exceptions/recordNotFound';

/**
 * Retrieves User from request.session.userId
 */

export default class {

    constructor( request ) {
        this.userId = _.get( request.session, 'userId' );

        this.user = null;
    }

    execute() {
        if ( this.userId ) {
            return User
                .forge( { id: this.userId } )
                .fetch();
        } else {
            throw new RecordNotFoundError();
        }
    }
}