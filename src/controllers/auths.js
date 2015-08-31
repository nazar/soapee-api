import SignUpOrLoginFromThirdParty from 'services/form/signUpOrLoginFromThirdParty';
import SignUpOrLoginFromLocal from 'services/form/signUpOrLoginFromLocal';
import loginFromLocal from 'services/form/loginFromLocal';

import UserFromSession from 'services/data/userFromSession';
import LocalUsernameExists from 'services/data/localUsernameExists';
import LocalEmailExists from 'services/data/localEmailExists';

import promiseResponder from 'utils/promiseResponder';
import serviceResponder from 'utils/serviceResponder';

export function post( req, res, next ) {
    let service;

    if ( req.body.provider === 'local' ) {
        service = new SignUpOrLoginFromLocal( req.body );
    } else {
        service = new SignUpOrLoginFromThirdParty( req.body );
    }

    service.execute()
        .tap( saveUserToSession( req ) )
        .then( filterOutPrivateProperties )
        .then( promiseResponder( res ) )
        .catch( next );
}

export function currentUser( req, res, next ) {
    let service;

    service = new UserFromSession( req );

    service.execute()
        .then( filterOutPrivateProperties )
        .then( promiseResponder( res ) )
        .catch( next );
}

export function login( req, res, next ) {
    let service;

    service = new loginFromLocal( req.body );

    service.execute()
        .tap( saveUserToSession( req ) )
        .then( filterOutPrivateProperties )
        .then( promiseResponder( res ) )
        .catch( next );
}

export function logout( req, res ) {
    if ( req.session ) {
        req.session.destroy();
    }

    res
        .status( 200 )
        .send( {} );
}

export function usernameExists( req, res, next ) {
    serviceResponder( res, next, LocalUsernameExists, req.params );
}

export function emailExists( req, res, next ) {
    serviceResponder( res, next, LocalEmailExists, req.params );
}

/////////////////
//// private

function saveUserToSession( request ) {
    return user => {
        request.session.userId = user.id;
    };
}

function filterOutPrivateProperties( user ) {
    return {
        id: user.get( 'id' ),
        name: user.get( 'name' ),
        imageUrl: user.get( 'image_url' ),
        lastLoggedIn: user.get( 'last_logged_in' )
    };
}