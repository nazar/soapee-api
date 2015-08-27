import ResetsSendVerificationEmail from 'services/form/resetsSendVerificationEmail';
import ResetsVerifyResetCode from 'services/form/resetsVerifyResetCode';
import ResetsResetPassword from 'services/form/resetsResetPassword';

import promiseResponder from 'utils/promiseResponder';
import serviceResponder from 'utils/serviceResponder';


export function requestReset( req, res, next ) {
    serviceResponder( res, next, ResetsSendVerificationEmail, {
        email: req.body.email
    } );
}

export function verifyResetCode( req, res, next ) {
    serviceResponder( res, next, ResetsVerifyResetCode, {
        token: req.body.token,
        code: req.body.code
    } );
}

export function resetPassword( req, res, next ) {
    let service = ResetsResetPassword;

    service = new ResetsResetPassword( {
        token: req.body.token,
        code: req.body.code,
        password: req.body.password
    } );

    service.execute()
        .then( saveUserToSession( req ) )
        .then( () => {
            res.json( { done: true } );
        } )
        .catch( next );
}


///////////////////
function saveUserToSession( request ) {
    return user => {
        request.session.userId = user.id;
    };
}