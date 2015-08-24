import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Image } from 'models/image';
import { User } from 'models/user';

export let StatusUpdate = bookshelf.Model.extend( {
    tableName: 'status_updates',
    hasTimestamps: true,

    user() {
        return this.belongsTo( User )
    },

    comments() {
        return this.morphMany( Comment, 'commentable' );
    },

    images() {
        return this.morphMany( Image, 'imageable' );
    }

} );

export let StatusUpdates = bookshelf.Collection.extend( {
    model: StatusUpdate
} );