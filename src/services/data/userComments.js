import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;

        this.user = null;
        this.comments = null;
    }

    execute() {
        return getUser.call( this )
            .bind( this )
            .then( setUser )
            .then( returnComments );
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
            withRelated: [ 'comments.user', {
                comments: qb => {
                    qb.orderBy( 'created_at', 'desc' );
                }
            }]
        } );
}

function setUser( user ) {
    this.user = user;
}

function returnComments() {
    return this.user.related( 'comments' );
}