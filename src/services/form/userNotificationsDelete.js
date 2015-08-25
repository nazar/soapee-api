import _ from 'lodash';
import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.notificationId = options.notificationId;
    }

    execute() {
        return getUserFromDatabase.call( this )
            .bind( this )
            .then( setNotification )
            .then( deleteNotification )
            .then( returnNotification );
    }
}

////////////////////
///// private

function getUserFromDatabase() {
    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            withRelated: [
                {
                    userNotifications: qb => {
                        qb.where( {
                            id: Number( this.notificationId )
                        } );
                    }
                }
            ]
        } );
}

function setNotification( user ) {
    this.notifications = user.related( 'userNotifications' ).first();
}

function deleteNotification() {
    let payload = _.extend( {}, this.payload );

    if ( payload.read ) {
        payload.read_on = new Date();
    }

    // this.notifications is a collection with a single item as user has many userNotifications
    // get the first item to get the model
    return this.notifications
        .destroy()
        .then( notifications => this.notifications = notifications );
}

function returnNotification() {
    return this.notifications;
}

