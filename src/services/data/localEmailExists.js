import _ from 'lodash';

import { User } from 'models/user';

export default class {

    constructor( params ) {
        this.email = _.get( params, 'email' );
    }

    execute() {
        return User
            .forge( {
                email: this.email
            } )
            .fetch()
            .then( record => {
                return {
                    exists: _.isObject( record )
                };
            } );
    }
}