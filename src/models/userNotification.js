import bookshelf from 'db/bookshelf';

import { User } from 'models/user';

export let UserNotification = bookshelf.Model.extend( {
    tableName: 'user_notifications',
    hasTimestamps: true,

    user() {
        return this.belongsTo( User );
    }

} );

export let UserNotifications = bookshelf.Collection.extend( {
    model: UserNotification
} );