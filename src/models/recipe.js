import bookshelf from 'db/bookshelf';

import { User } from 'models/user';

export let Recipe = bookshelf.Model.extend( {
    tableName: 'recipes',
    hasTimestamps: true,

    //relations
    user() {
        return this.belongsTo( User )
            .query( {
                columns: [ 'id', 'name', 'image_url' ]
            } );
    }
} );

export let Recipes = bookshelf.Collection.extend( {
    model: Recipe
} );