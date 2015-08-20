import bookshelf from 'db/bookshelf';

import { Feedable } from 'models/feedable';
import { Oil } from 'models/oil';
import { Recipe } from 'models/recipe';
import { StatusUpdate } from 'models/statusUpdate';
import { User } from 'models/user';

export let Comment = bookshelf.Model.extend( {
    tableName: 'comments',
    hasTimestamps: true,

    user() {
        return this
            .belongsTo( User )
            .query( {
                columns: [ 'id', 'name', 'image_url' ] //todo - remove, should be restricted in data object not in model
            } );
    },

    commentable() {
        return this.morphTo( 'commentable', Feedable, Oil, Recipe, StatusUpdate );
    }

} );

export let Comments = bookshelf.Collection.extend( {
    model: Comment
} );