import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.limit = options.limit || 10;

        this.notifications = null;
    }

    execute() {
        return getUserFriendshipNotifications.call( this )
            .bind( this )
            .then( setNotifications )
            .then( returnNotifications );
    }
}

/////////////
////

function getUserFriendshipNotifications() {

    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            withRelated: [
                {
                    userNotifications: qb => {
                        qb
                            .whereIn( 'user_notifiable_type', [ 'friendships', 'comments' ] )
                            .limit( this.limit )
                            .orderBy( 'created_at', 'desc' );
                    }
                },
                'userNotifications.userNotifiable.user' // <3 <3 <3 <3 thank you bookshelf!! <3 <3 <3 <3 <3
            ]
        } );
}

function setNotifications( user ) {
    this.notifications = user.related( 'userNotifications' );
}

function returnNotifications() {
    return this.notifications;
}