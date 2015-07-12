import bookshelf from 'db';

export let Recipe = bookshelf.Model.extend( {
    tableName: 'recipes',
    hasTimestamps: true,
} );

export let Recipes = bookshelf.Collection.extend( {
    model: Recipe
} );