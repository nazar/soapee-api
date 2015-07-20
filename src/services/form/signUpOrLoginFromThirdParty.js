import _ from 'lodash';
import request from 'superagent';
import Promise from 'bluebird';

import { User } from 'models/user';
import { Verification } from 'models/verifications';

/**
 * Signs up or logs in the user from either facebook or google
 *
 * Each user can have multiple verifications, which stores a provider's ID (i.e. facebooks or google's user id).
 *
 * For facebook and google the procedure is as follows: if the provider id exists in verifications.provider_id, then the user is already registered.
 * Otherwise, create a new User then a Verification
 *
 */

export default class {

    constructor( payload ) {
        this.provider = payload.provider;
        this.accessToken = payload.accessToken;

        this.userDetails = null;
        this.user = null;
        this.verification = null;
    }

    execute() {
        return requestUserDetails.call( this )
            .then( setUserDetails.bind( this ) )
            .then( lookupProviderVerification.bind( this ) )
            .then( createUserAndVerificationIfRequired.bind( this ) );
    }
}

/////////////////
/// private


function requestUserDetails() {
    let requesters = {
        facebook: facebookDataRequester,
        google: googleDataRequester
    };

    return requesters[ this.provider ].call( this );
}

function setUserDetails( userDetails ) {
    this.userDetails = userDetails;
}

function facebookDataRequester() {
    return new Promise( ( resolve, reject ) => {
        request
            .get( 'https://graph.facebook.com/me' )
            .query( { access_token: this.accessToken } )
            .set( 'Accept', 'application/json' )
            .end( ( err, res ) => {
                if ( err ) {
                    reject( err );
                } else {
                    resolve( res.body );
                }
            } );
    } )
        .then( extractIdAndName );


    function extractIdAndName( data ) {
        return {
            id: data.id,
            name: data.name,
            imageUrl: `https://graph.facebook.com/${data.id}/picture`
        };
    }
}

function googleDataRequester() {
    return new Promise( ( resolve, reject ) => {
        request
            .get( 'https://www.googleapis.com/plus/v1/people/me' )
            .query( { access_token: this.accessToken } )
            .set( 'Accept', 'application/json' )
            .end( ( err, res ) => {
                if ( err ) {
                    reject( err );
                } else {
                    resolve( res.body );
                }
            } );
    } )
        .then( extractIdAndName );

    function extractIdAndName( data ) {
        return {
            id: data.id,
            name: data.displayName,
            imageUrl: _.get( data, 'image.url' )
        };
    }

}

function lookupProviderVerification() {
    return Verification
        .forge( {
            provider_name: this.provider,
            provider_id: this.userDetails.id
        } )
        .fetch();
}

function createUserAndVerificationIfRequired( verification ) {
    if ( verification ) {
        //user exists - update load_logged in
        return getUser.call( this, verification.get( 'user_id' ) )
            .then( setUser.bind( this ) )
            .then( updateLastLogin.bind( this ) )
            .then( setUser.bind( this ) )
            .then( returnUser.bind( this ) );
    } else {
        //user doesn't exist :-
        //  1. create a user
        //  2. create a verification and link to user
        //  3. return new user
        return createUser.call( this )
            .then( setUser.bind( this ) )
            .then( createVerificationForUser.bind( this ) )
            .then( returnUser.bind( this ) );


    }
}

function createUser() {
    return User
        .forge( {
            name: this.userDetails.name,
            image_url: this.userDetails.imageUrl,
            last_logged_in: new Date()
        } )
        .save();
}

function setUser( user ) {
    this.user = user;
}

function updateLastLogin() {
    return this.user.save( { last_logged_in: new Date() }, { patch: true } );
}

function createVerificationForUser() {
    return Verification
        .forge( {
            user_id: this.user.id,
            provider_name: this.provider,
            provider_id: this.userDetails.id
        } )
        .save();
}

function returnUser() {
    return this.user;
}

function getUser( userId ) {
    return User
        .forge( { id: userId } )
        .fetch();
}