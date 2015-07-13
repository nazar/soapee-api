import bookshelf from 'db/bookshelf';

export let Oil = bookshelf.Model.extend( {
    tableName: 'oils',
    hasTimestamps: true
} );

export let Oils = bookshelf.Collection.extend( {
    model: Oil
} );