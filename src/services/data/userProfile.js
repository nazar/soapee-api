import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;

        this.user = null;
    }

    execute() {
        return getUser.call( this )
            .bind( this )
            .then( setUser )
            .then( returnUser );
    }
}

//////////////////
////// Private

function getUser() {
    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            columns: [ 'id', 'name', 'image_url', 'about' ]
        } );
}

function setUser( user ) {
    this.user = user;
}

function returnUser() {
    return this.user;
}