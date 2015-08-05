import _ from 'lodash';
import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.filters = _.extend( {}, options.filters );

        this.notifications = null;
    }

    execute() {
        return getUserWithNotifications.call( this )
            .bind( this )
            .then( setNotifications )
            .then( returnNotifications );
    }
}

/////////////
////

function getUserWithNotifications() {

    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            withRelated: [
                {
                    userNotifications: qb => {
                        qb
                            .where( {
                                read: Number( this.filters.read ) || 0
                            } )
                            .orderBy( 'created_at', 'desc' );
                    }
                }
            ]
        } );
}

function setNotifications( user ) {
    this.notifications = user.related( 'userNotifications' );
}

function returnNotifications() {
    return this.notifications;
}