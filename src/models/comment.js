import bookshelf from 'db/bookshelf';

import { Oil } from 'models/oil';
import { Recipe } from 'models/recipe';
import { User } from 'models/user';

export let Comment = bookshelf.Model.extend( {
    tableName: 'comments',
    hasTimestamps: true,

    user() {
        return this
            .belongsTo( User )
            .query( {
                columns: [ 'id', 'name', 'image_url' ]
            } );
    },

    commentable() {
        return this.morhphTo( 'commentable', Recipe, Oil );
    }

} );

export let Comments = bookshelf.Collection.extend( {
    model: Comment
} );