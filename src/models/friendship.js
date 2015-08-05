import bookshelf from 'db/bookshelf';
import { User } from 'models/user';

export let Friendship = bookshelf.Model.extend( {
    tableName: 'friendships',
    hasTimestamps: true,

    user() {
        return this.belongsTo( User );
    },

    friend() {
        return this.belongsTo( User, 'friend_id' );
    }

} );

export let Friendships = bookshelf.Collection.extend( {
    model: Friendship
} );