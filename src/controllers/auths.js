import promiseResponder from 'utils/promiseResponder';
import notFoundResponder from 'utils/notFoundResponder';

import SignUpOrLoginFromThirdParty from 'services/form/signUpOrLoginFromThirdParty';
import UserFromSession from 'services/data/userFromSession';

export function post( req, res ) {
    let service;

    if ( req.body.provider === 'local' ) {
        service = 1;
    } else {
        service = new SignUpOrLoginFromThirdParty( req );
    }

    service.execute()
        .tap( saveUserToSession( req ) )
        .then( filterOutPrivateProperties )
        .then( promiseResponder( res ) );
}

export function currentUser( req, res ) {
    let service;

    service = new UserFromSession( req );

    service.execute()
        .then( filterOutPrivateProperties )
        .then( promiseResponder( res ) )
        .catch( notFoundResponder( res ) );
}

export function login( req, res ) {

}

export function logout( req, res ) {
    if ( req.session ) {
        req.session.destroy();
    }

    res
        .status( 200 )
        .send( {} );
}

/////////////////
//// private

function saveUserToSession( request ) {
    return user => {
        request.session.userId = user.id;
        request.session.save();
    };
}

function filterOutPrivateProperties( user ) {
    return {
        name: user.get( 'name' ),
        imageUrl: user.get( 'image_url' ),
        lastLoggedIn: user.get( 'last_logged_in' )
    };
}