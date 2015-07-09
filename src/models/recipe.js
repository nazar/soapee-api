import bookshelf from 'db';

export let Recipe = bookshelf.Model.extend( {
    tableName: 'recipes'
} );

export let Recipes = bookshelf.Collection.extend( {
    model: Recipe
} );