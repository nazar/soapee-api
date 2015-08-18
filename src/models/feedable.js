import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Recipe } from 'models/recipe';
import { User } from 'models/user';

export let Feedable = bookshelf.Model.extend( {
    tableName: 'feedables',
    hasTimestamps: true,

    feedable() {
        return this.morphTo( 'feedable', Comment, Recipe, User );
    },

    comments() {
        return this.morphMany( Comment, 'commentable' );
    }

} );

export let Feedables = bookshelf.Collection.extend( {
    model: Feedable
} );