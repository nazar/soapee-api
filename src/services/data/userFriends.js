import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;
    }

    execute() {
        return getUserFriends.call( this )
            .then( returnFriends );
    }
}

/////////////
////

function getUserFriends() {

    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            withRelated: [ {
                friends: qb => {
                    qb.select( 'users.id', 'users.image_url', 'users.name' )
                }
            } ]
        } );
}

function returnFriends( user ) {
    return user.related( 'friends' );
}