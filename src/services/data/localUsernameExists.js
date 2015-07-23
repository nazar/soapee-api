import _ from 'lodash';

import { Verification } from 'models/verification';

export default class {

    constructor( params ) {
        this.username = _.get( params, 'username' );
    }

    execute() {
        return Verification
            .forge( {
                provider_id: this.username,
                provider_name: 'local'
            } )
            .fetch()
            .then( record => {
                return {
                    exists: _.isObject( record )
                };
            } );
    }
}