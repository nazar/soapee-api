import sanitize from 'utils/sanitize';

import { User } from 'models/user';

export default class {

    constructor( payload ) {
        this.id = payload.userId;
        this.name = payload.name;
        this.about = payload.about || '';

        this.user = null;
    }

    execute() {
        return getUserFromDatabase.call( this )
            .bind( this )
            .then( setUser )
            .then( sanitizeInputs )
            .then( updateUser )
            .then( returnUser );
    }
}

////////////////////
///// private

function getUserFromDatabase() {
    return User
        .forge( { id: this.id } )
        .fetch();
}

function setUser( user ) {
    this.user = user;
}

function sanitizeInputs() {
    this.about = sanitize( this.about );
}

function updateUser() {
    return this.user
        .save( {
            name: this.name,
            about: this.about
        }, {
            patch: true
        } );
}

function returnUser() {
    return {
        name: this.user.get( 'name' ),
        about: this.user.get( 'about' ),
        image_url: this.user.get( 'image_url' )
    };
}

