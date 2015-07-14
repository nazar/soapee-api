import _ from 'lodash';

import { Verification } from 'models/verifications';

export default class {

    constructor( request ) {
        this.username = request.params.username;
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