import bookshelf from 'db/bookshelf';

import { Verification } from 'models/verifications';
import { Recipe } from 'models/recipe';

export let User = bookshelf.Model.extend( {
    tableName: 'users',
    hasTimestamps: true,

    //relations
    verifications() {
        return this.hasMany( Verification );
    },

    recipes() {
        return this.hasMany( Recipe );
    }

} );

export let Users = bookshelf.Collection.extend( {
    model: User
} );