import bookshelf from 'db/bookshelf';

export let RecipeOil = bookshelf.Model.extend( {
    tableName: 'recipe_oils',
    hasTimestamps: true
} );

export let RecipeOils = bookshelf.Collection.extend( {
    model: RecipeOil
} );