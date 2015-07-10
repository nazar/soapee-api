import { User } from 'models/users';
import { Verification } from 'models/verifications';

/**
 * Signs up or logs in the user from either: facebook, google or by local (i.e. username and password
 *
 * Each user can have multiple verifications, which stores a provider's ID.
 * In the case of local verification, the password is stored as a one way salted hash
 *
 * For facebook and google the procedure is as follows:
 *   1. if the provider id exists in verifications.provider_id, then the user is already registered.
 *      Otherwise, create a new User then a Verification
 *
 *
 */

export default class {

    constructor( request ) {
        this.payload = request.body;

        this.user = null;
        this.verification = null;
        this.hash = null;
    }

    execute() {
        return lookupProviderVerification.call( this )
            .then( createUserAndVerificationIfRequired.bind( this ) );
    }
}

/////////////////
/// private


function lookupProviderVerification() {
    return Verification
        .forge( { provider_id: this.payload.userDetails.id } )
        .fetch();
}

function createUserAndVerificationIfRequired( verification ) {
    console.log( 'createUserAndVerificationIfRequired', verification );

    if ( verification ) {
        return getUser.call( this, verification.get( 'id' ) );
        //user exists... lookup and return user
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
    let userDetails = this.payload.userDetails;

    return User
        .forge( {
            name: userDetails.name,
            image_url: userDetails.imageUrl,
            last_logged_in: new Date()
        } )
        .save();
}

function setUser( user ) {
    this.user = user;
}

function createVerificationForUser() {
    return Verification
        .forge( {
            user_id: this.user.id,
            provider_name: this.payload.provider,
            provider_id: this.payload.userDetails.id
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