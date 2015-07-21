import bookshelf from 'db/bookshelf';

import { Recipe } from 'models/recipe';
import { RecipeOil } from 'models/recipeOil';

export let Oil = bookshelf.Model.extend( {
    tableName: 'oils',
    hasTimestamps: true,

    recipes() {
        return this.belongsToMany( Recipe ).through( RecipeOil );
    }
} );

export let Oils = bookshelf.Collection.extend( {
    model: Oil
} );