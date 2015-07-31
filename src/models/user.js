import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Recipe } from 'models/recipe';
import { Verification } from 'models/verification';

export let User = bookshelf.Model.extend( {
    tableName: 'users',
    hasTimestamps: true,

    verifications() {
        return this.hasMany( Verification );
    },

    comments() {
        return this.hasMany( Comment );
    },

    recipes() {
        return this.hasMany( Recipe );
    },

    favouriteRecipes() {
        return this
            .belongsToMany( Recipe, 'favourite_recipes' )
            .query( {
                where: {
                    visibility: 1
                }
            } );
    }

} );

export let Users = bookshelf.Collection.extend( {
    model: User
} );