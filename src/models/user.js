import bookshelf from 'db/bookshelf';

import { Verification } from 'models/verification';
import { Recipe } from 'models/recipe';

export let User = bookshelf.Model.extend( {
    tableName: 'users',
    hasTimestamps: true,

    verifications() {
        return this.hasMany( Verification );
    },

    recipes() {
        return this.hasMany( Recipe );
    },

    favouriteRecipes() {
        return this.belongsToMany( Recipe, 'favourite_recipes' );
    }

} );

export let Users = bookshelf.Collection.extend( {
    model: User
} );