var schema = require( './helpers/schema' );

exports.up = function ( knex ) {
    return schema.addColumn.call(knex, 'recipes', 'settings', 'JSONB');
};

exports.down = function ( knex ) {
    return schema.removeColumn.call( knex, 'recipes', 'settings' );
};
