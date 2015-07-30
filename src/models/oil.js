import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Recipe } from 'models/recipe';

export let Oil = bookshelf.Model.extend( {
    tableName: 'oils',
    hasTimestamps: true,

    recipes() {
        return this.belongsToMany( Recipe, 'recipe_oils' ).withPivot( 'weight' );
    },

    comments() {
        return this.morphMany( Comment, 'commentable' );
    }

} );

export let Oils = bookshelf.Collection.extend( {
    model: Oil
} );