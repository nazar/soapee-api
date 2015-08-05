import _ from 'lodash';
import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.notificationId = options.notificationId;
        this.payload = options.payload;

        this.notifications = null;
    }

    execute() {
        return getUserFromDatabase.call( this )
            .bind( this )
            .then( setNotification )
            .then( updateNotification )
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
                        } )
                    }
                }
            ]
        } );
}

function setNotification( user ) {
    // this.notifications is a collection with a single item as user has many userNotifications
    // get the first item to get the model
    this.notifications = user.related( 'userNotifications' ).first();
}

function updateNotification() {
    let payload = _.extend( {}, this.payload );

    if ( payload.read ) {
        payload.read_on = new Date()
    }

    return this.notifications
        .save( payload, { patch: true } )
        .then( notifications => this.notifications = notifications );
}

function returnNotification() {
    return this.notifications;
}

