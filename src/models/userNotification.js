import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Friendship } from 'models/friendship';
import { User } from 'models/user';

export let UserNotification = bookshelf.Model.extend( {
    tableName: 'user_notifications',
    hasTimestamps: true,

    user() {
        return this.belongsTo( User );
    },

    userNotifiable() {
        return this.morphTo( 'user_notifiable', Friendship, Comment );
    }

} );

export let UserNotifications = bookshelf.Collection.extend( {
    model: UserNotification
} );