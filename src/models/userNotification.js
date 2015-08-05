import bookshelf from 'db/bookshelf';

import { User } from 'models/user';
import { Friendship } from 'models/friendship';

export let UserNotification = bookshelf.Model.extend( {
    tableName: 'user_notifications',
    hasTimestamps: true,

    user() {
        return this.belongsTo( User );
    },

    userNotifiable() {
        return this.morhphTo( 'user_notifiable', Friendship );
    }

} );

export let UserNotifications = bookshelf.Collection.extend( {
    model: UserNotification
} );