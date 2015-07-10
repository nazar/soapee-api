import _ from 'lodash';

import SignUpOrLoginFromThirdParty from 'services/form/signUpOrLoginFromThirdParty';
import promiseResponder from 'utils/promiseResponder';

export function post( req, res ) {
    let service = new SignUpOrLoginFromThirdParty( req );

    service.execute()
        .then( promiseResponder( res ) );
}

export function login( req, res ) {

}

export function verify( req, res ) {

}