import { Verification } from 'models/verification';

export default class {

    constructor( payload ) {
        this.token = payload.token;
        this.code = payload.code;
    }

    execute() {
        return getUserFromDatabase.call( this )
            .then( done );
    }
}

////////////////////
///// private

function getUserFromDatabase() {
    return Verification
        .forge( {
            reset_hash: this.token,
            reset_code: this.code
        } )
        .fetch( {
            require: true
        } );
}

function done() {
    return {
        valid: true
    };
}

