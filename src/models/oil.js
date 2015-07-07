import bookshelf from 'db';

export let Oil = bookshelf.Model.extend( {
    tableName: 'oils'
} );

export let Oils = bookshelf.Collection.extend( {
    model: Oil
} );