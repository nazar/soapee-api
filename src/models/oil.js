import bookshelf from 'db/bookshelf';

import { Recipe } from 'models/recipe';

export let Oil = bookshelf.Model.extend( {
    tableName: 'oils',
    hasTimestamps: true,

    recipes() {
        return this.belongsToMany( Recipe, 'recipe_oils' ).withPivot( 'weight' );
    }
} );

export let Oils = bookshelf.Collection.extend( {
    model: Oil
} );