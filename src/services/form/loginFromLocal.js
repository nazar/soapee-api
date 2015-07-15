import _ from 'lodash';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';

import { Verification } from 'models/verifications';

import SignupFields from 'services/validate/signupFields';

import BadPasswordError from 'exceptions/badPassword';

export default class {

    constructor( request ) {
        this.username = _.get( request.body, 'username' );
        this.password = _.get( request.body, 'password' );

        this.verification = null;
        this.user = null;
    }

    execute() {
        return validateInput.call( this )
            .then( getVerificationAndUser.bind( this ) )
            .then( verifyPassword.bind( this ) )
            .then( returnUser.bind( this ) );
    }
}

////////////////////
///// private

function validateInput() {
    let validator = new SignupFields( {
        username: this.username,
        password: this.password
    } );

    return validator.execute();
}

function getVerificationAndUser() {
    return Verification
        .forge( {
            provider_id: this.username,
            provider_name: 'local'
        } )
        .fetch( {
            withRelated: 'user'
        } )
        .then( setUserFromVerification.bind( this ) );


    function setUserFromVerification( verification ) {
        if ( verification ) {
            this.verification = verification;
            this.user = verification.related( 'user' );
        } else {
            throw new BadPasswordError( 'Username and password do not match' );
        }
    }
}

function verifyPassword() {
    return Promise.promisify( bcrypt.compare )( this.password, this.verification.get( 'hash' ) )
        .then( matches => {
            if ( !(matches) ) {
                throw new BadPasswordError();
            }
        } );
}

function returnUser() {
    return this.user;
}