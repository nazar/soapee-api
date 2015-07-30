import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Oil } from 'models/oil';
import { User } from 'models/user';

export let Recipe = bookshelf.Model.extend( {
    tableName: 'recipes',
    hasTimestamps: true,

    user() {
        return this.belongsTo( User )
            .query( {
                columns: [ 'id', 'name', 'image_url' ]
            } );
    },

    oils() {
        return this.belongsToMany( Oil, 'recipe_oils' ).withPivot( 'weight' );
    },

    comments() {
        return this.morphMany( Comment, 'commentable' );
    }

} );

export let Recipes = bookshelf.Collection.extend( {
    model: Recipe
} );