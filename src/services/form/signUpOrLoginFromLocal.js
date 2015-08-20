import _ from 'lodash';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';

import { Feedable } from 'models/feedable';
import { User } from 'models/user';
import { Verification } from 'models/verification';

import SignupFields from 'services/validate/signupFields';

import BadPasswordError from 'exceptions/badPassword';

export default class {

    constructor( payload ) {
        this.username = _.get( payload, 'userDetails.username' );
        this.password = _.get( payload, 'userDetails.password' );

        this.process = null;
        this.verification = null;
        this.user = null;
    }

    execute() {
        return checkForLogin.call( this )
            .bind( this )
            .then( setProcessType )
            .then( verifyForSignup )
            .then( doRegistrationIfSigningUp )
            .then( createFeedIfNewUser )
            .then( verifyPasswordIfLoggingIn )
            .then( returnUser );
    }
}

////////////////////
///// private

function checkForLogin() {
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
        }
    }
}


function setProcessType() {
    if ( this.user ) {
        this.process = 'login';
    } else {
        this.process = 'signup';
    }
}

function verifyForSignup() {
    if ( this.process === 'signup' ) {
        let validator = new SignupFields( {
            username: this.username,
            password: this.password
        } );

        return validator.execute();
    }
}

function doRegistrationIfSigningUp() {

    if ( this.process === 'signup' ) {
        return createUser.call( this )
            .then( setUser.bind( this ) )
            .then( generateSalt.bind( this ) )
            .then( generateHash.bind( this ) )
            .then( createVerification.bind( this ) );
    }


    function createUser() {
        return User
            .forge( {
                name: this.username,
                last_logged_in: new Date()
            } )
            .save();
    }

    function setUser( user ) {
        this.user = user;
    }

    function generateSalt() {
        return Promise.promisify( bcrypt.genSalt )( 10 );
    }

    function generateHash( salt ) {
        return Promise.promisify( bcrypt.hash )( this.password, salt );
    }

    function createVerification( hash ) {
        return Verification
            .forge( {
                user_id: this.user.get( 'id' ),
                provider_id: this.username,
                provider_name: 'local',
                hash: hash
            } )
            .save();
    }
}

function createFeedIfNewUser() {
    if ( this.process === 'signup' ) {
        return Feedable
            .forge( {
                feedable_id: this.user.get( 'id' ),
                feedable_type: 'users',
                feedable_meta: {
                    user: {
                        id: this.user.get( 'id' ),
                        name: this.user.get( 'name' ),
                        image_url: this.user.get( 'image_url' )
                    }
                }
            } )
            .save();
    }
}

function verifyPasswordIfLoggingIn() {

    function updateLastLoggedInDate() {
        return this.user.save( { last_logged_in: new Date() }, { patch: true } );
    }

    if ( this.process === 'login' ) {

        return Promise.promisify( bcrypt.compare )( this.password, this.verification.get( 'hash' ) )
            .then( matches => {
                if ( !(matches) ) {
                    throw new BadPasswordError();
                }
            } )
            .then( updateLastLoggedInDate.bind( this ) );
    }
}

function returnUser() {
    return this.user;
}