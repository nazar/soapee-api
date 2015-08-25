import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Image } from 'models/image';
import { Recipe } from 'models/recipe';

export let RecipeJournal = bookshelf.Model.extend( {
    tableName: 'recipe_journals',
    hasTimestamps: true,

    recipes() {
        return this.belongsTo( Recipe );
    },

    comments() {
        return this.morphMany( Comment, 'commentable' );
    },

    images() {
        return this.morphMany( Image, 'imageable' );
    }

} );

export let RecipeJournals = bookshelf.Collection.extend( {
    model: RecipeJournal
} );