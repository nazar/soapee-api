import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Image } from 'models/image';
import { Oil } from 'models/oil';
import { RecipeJournal } from 'models/recipeJournal';
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

    recipeJournals() {
        return this.hasMany( RecipeJournal );
    },

    oils() {
        return this.belongsToMany( Oil, 'recipe_oils' ).withPivot( 'weight' );
    },

    comments() {
        return this.morphMany( Comment, 'commentable' );
    },

    images() {
        return this.morphMany( Image, 'imageable' );
    }

} );

export let Recipes = bookshelf.Collection.extend( {
    model: Recipe
} );